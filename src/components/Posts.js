import React, { useEffect, useState } from 'react';
import { fetchAllPosts } from './Fetch'
import { renderAllPosts, renderNewPostForm, renderLogin, renderRegister } from './Render'

async function messageUser(postObj, userToken, postID) {
    console.log(postObj, userToken)
    return fetch(`https://strangers-things.herokuapp.com/api/2211-ftb-et-web-pt/posts/${postID}/messages`, {
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


const Posts = ({ token }) => {
    const [posts, setPosts] = useState([])

    const [content, setcontent] = useState();

    const handleSubmit = async event => {
        event.preventDefault();
        const obj = {
            message: {content}
        }
        await messageUser(obj, token, )
    }

    useEffect(() => {
        const fetchData = async () => {
          const result = await fetchAllPosts();
          setPosts(result);
        };
    
        fetchData();
      }, []);
    return posts.map((post) => (
        <option key={post._id} value={post.title}>
            <div>
                <h4>{post.title}</h4>
                <div>{post._id}</div>
                <div>{post.description}</div> 
                <div>{post.price}</div>
                <div>{post.location}</div>  
                <div>{post.willDeliver ? "Will Deliver" : "Will not Deliver"}</div>  
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Message Owner</p>
                        <input type="text"/>
                    </label>
                    <div>
                        <button type="submit" onChange={event => setcontent(event.target.value)}>Message</button>
                    </div>
                </form>
            </div> 
        </option>
    ))

    //renderAllPosts(posts)
    //renderLogin()
    //renderRegister()
    //renderNewPostForm()
}

export default Posts;