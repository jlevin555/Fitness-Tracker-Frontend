import React, { useEffect, useState } from 'react';
import { fetchAllPosts } from './Fetch'
import { renderAllPosts, renderNewPostForm, renderLogin, renderRegister } from './Render'

async function messageUser(postObj, userToken, postID) {
    console.log(postObj, userToken)
    return await fetch(`https://strangers-things.herokuapp.com/api/2211-ftb-et-web-pt/posts/${postID}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify(postObj)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        return result;
      })
      .catch(console.error);
  }

  async function deletePost(userToken, postID) {
    return await fetch(`https://strangers-things.herokuapp.com/api/2211-ftb-et-web-pt/posts/${postID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        return result;
      })
      .catch(console.error);
  }


const Posts = ({ token }) => {
    const [posts, setPosts] = useState([])
    const [id, setid] = useState()
    const [content, setcontent] = useState("");
    
    const handleSubmit = async event => {
      console.log("String", event)
        event.preventDefault();
        const obj = {
            message: {content}
        }
        console.log("String 2", obj)
        setid(event.target[1].value)
        await messageUser(obj, token, id)
    }

    const handleDelete = async event => {
      event.preventDefault();
      setid(event.target[0].value)
      await deletePost(token, id);
      console.log("String 5", event.target[0].value)

  }

    useEffect(() => {
        const fetchData = async () => {
          const result = await fetchAllPosts();
          setPosts(result);
        };
    
        fetchData();
      }, []);
    return posts.map((post) => (
        <div key={post._id} class="posts">
            <div>
                <h4>{post.title}</h4>
                <div>Owner: {post.author.username}</div>
                <div>Description: {post.description}</div> 
                <div>Price: {post.price}</div>
                <div>Location: {post.location}</div>  
                <div>{post.willDeliver ? "Will Deliver" : "Will not Deliver"}</div>  
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Message Owner</p>
                        <input placeholder="Type message here..." type="text" onChange={event => {setcontent(event.target.value);console.log("String 3", event.target.value)}}/>
                    </label>
                    <br></br>
                    <input id="post-id" value={post._id} class="hidden"></input>
                    <div>
                        <button type="submit" >Double Click to Send Message</button>
                    </div>
                </form>
                <form onSubmit={handleDelete}>
                    <br></br>
                    <input id="post-id" value={post._id} class="hidden"></input>
                    <div>
                        <button type="submit">Double Click to Delete Post</button>
                    </div>
                </form>
            </div> 
        </div>
    ))

    //renderAllPosts(posts)
    //renderLogin()
    //renderRegister()
    //renderNewPostForm()
}

export default Posts;