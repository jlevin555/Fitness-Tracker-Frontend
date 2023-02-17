import React, { useEffect, useState } from 'react';

async function addNewPost(postObj, userToken) {
    console.log(postObj, userToken)
    return fetch('https://strangers-things.herokuapp.com/api/2211-ftb-et-web-pt/posts', {
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


export const NewPost = ({ token }) => {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [location, setLocation] = useState();
    const [deliver, setDeliver] = useState(false);

    const handleSubmit = async event => {
        event.preventDefault();
        const obj = {
            post: {title, description, price, location, deliver}
        }
        await addNewPost(obj, token)
    }
        


    return (    
        <form onSubmit={handleSubmit}>
          <label>
            <p>Title</p>
            <input type="text" onChange={event => setTitle(event.target.value)}/>
          </label>
          <label>
            <p>Description</p>
            <input type="text" onChange={event => setDescription(event.target.value)}/>
          </label>
          <label>
            <p>Price</p>
            <input type="text" onChange={event => setPrice(event.target.value)}/>
          </label>
          <label>
            <p>Location</p>
            <input type="text" onChange={event => setLocation(event.target.value)}/>
          </label>
          <label>
            <p>Will Deliver?</p>
            <p>Yes</p><input type="checkbox" onChange={event => setDeliver(true)}/>
            <p>No</p><input type="checkbox" onChange={event => setDeliver(false)}/>
          </label>
          <div>
            <button type="submit">Create New Post</button>
          </div>
        </form>
    )
}
export default NewPost;

