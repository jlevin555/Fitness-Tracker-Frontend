import React, { useEffect, useState } from 'react';

async function addNewRoutine(postObj, userToken) {
    console.log("AAAAAAAAAAAAAAA", postObj, userToken)
    return fetch('https://fitness-tracker-gsjx.onrender.com/api/routines', {
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
        return result;
      })
      .catch(console.error);
  }


export const AddRoutine = ({ token }) => {
    const [name, setName] = useState();
    const [goal, setGoal] = useState();
    const [isPublic, setIsPublic] = useState(false);

    const handleSubmit = async event => {
        event.preventDefault();
        const obj = {
            name, goal, isPublic
        }
        await addNewRoutine(obj, token)
    }
        


    return (    
        <form onSubmit={handleSubmit}>
          <label>
            <p>Name</p>
            <input type="text" onChange={event => setName(event.target.value)} placeholder="Name..."/>
          </label>
          <label>
            <p>Goal</p>
            <input type="text" onChange={event => setGoal(event.target.value)} placeholder="Goal..."/>
          </label>
          <label class="isPublic">
            <p>Public?</p>
            <div class="box">
              <p>Yes</p>
              <input type="checkbox" onChange={event => setIsPublic(true)}/>
            </div>
            <div class="box">
              <p>No</p>
              <input type="checkbox" onChange={event => setIsPublic(false)}/>
            </div>
          </label>
          <div>
            <button type="submit">Create New Routine</button>
          </div>
        </form>
    )
}
export default AddRoutine;

