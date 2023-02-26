import React, { useEffect, useState } from 'react';

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


export const Profile = ({ token })  => {
    const [user, setUser] = useState(); 
    const container = document.getElementById("container")
    const handleSubmit = async event => {
        event.preventDefault();
        const userObj = await userProfile(token);
        setUser(userObj);

        for (let i = 0; i < 10; i++){
          let Beans = user.data.messages[i].content
          let Toast = user.data.messages[i].fromUser.username
          let Tomato = user.data.messages[i].post.title
          console.log("String", user.data.messages)
          container.innerHTML += "From user:" + " " + Toast + " on post:" + " " + Tomato + "<br> message:" + " " + Beans + "<br>"
          }
        }

    return (
      <form onSubmit={handleSubmit}>
        <div id="container"></div>
        <div>
          <button type="submit">Double Click for Messages</button>
        </div>
      </form>
    )

}

export default Profile;