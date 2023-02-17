import React, { useEffect, useState } from 'react';

async function userProfile(userToken) {
    console.log(userToken)
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
        const Beans = user.data.messages
        console.log(Beans)
        container.innerHTML = Beans
    }
    return (
        <form onSubmit={handleSubmit}>
        <div id="container"></div>
        <div>
          <button type="submit">Messages</button>
        </div>
      </form>
    )

}

export default Profile;