import React, { useEffect, useState } from 'react';

async function deletePost(userToken, postID) {
    return fetch(`https://strangers-things.herokuapp.com/api/2211-ftb-et-web-pt/posts/${postID}`, {
      method: 'POST',
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

  async function userProfile(userToken) {
    return fetch('https://strangers-things.herokuapp.com/api/2211-ftb-et-web-pt/users/me', {
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

export const Delete = ({ token }) => {
    const [user, setUser] = useState(); 
    const container = document.getElementById("delete")
    const handleSubmit = async event => {
        event.preventDefault();
        const userObj = await userProfile(token);
        setUser(userObj);

        for (let i = 0; i < 10; i++){
          let Beans = user.data.posts[i].title
          let Toast = user.data.messages[i].fromUser.username
          let Tomato = user.data.messages[i].post.title
          console.log("String", user.data)
          container.innerHTML += "Post Title: " + Beans + " <button onClick={handleDelete}>Delete Post (Does not work)</button>" + "<br>"
          }

        const handleDelete = async event => {
            event.preventDefault();
            const userObj = await deletePost(token, );
        }
          
        }
        

    return (      
    <form onSubmit={handleSubmit}>
        <div id="delete"></div>
        <div>
        <button type="submit">Double Click for Posts</button>
        </div>
    </form>
  )
};

export default Delete;