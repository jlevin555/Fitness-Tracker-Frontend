import React, { useEffect, useState } from 'react';

async function addNewActivity(postObj, userToken) {
    console.log("AAAAAAAAAAAAAAA", postObj, userToken)
    return fetch('https://fitness-tracker-gsjx.onrender.com/api/activities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify(postObj)
    })
      .then(response => response.json())
      .then(result => {
        console.log("BBBBBBBBBBBBBBB", result);
        if (result.error === "Name already exists") {
          window.alert("An activity with that name already exists")
        }
        return result;
      })
      .catch(console.error);
  }


export const AddActivity = ({ token }) => {
    const [name, setName] = useState();
    const [description, setDescription] = useState();


    const handleSubmit = async event => {
        event.preventDefault();
        const obj = {
            name, description
        }
        await addNewActivity(obj, token)
    }
        


    return (    
        <form onSubmit={handleSubmit}>
          <label>
            <p>Name</p>
            <input type="text" onChange={event => setName(event.target.value)} placeholder="Name..."/>
          </label>
          <label>
            <p>Goal</p>
            <input type="text" onChange={event => setDescription(event.target.value)} placeholder="Description..."/>
          </label>
          <div>
            <button type="submit">Create New Activity</button>
          </div>
        </form>
    )
}
export default AddActivity;

