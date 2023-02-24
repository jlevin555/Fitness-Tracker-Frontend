import React, { useEffect, useState } from 'react';
import { addNewUser, userLogin } from './Fetch'

async function registerUser(credentials) {
  console.log(credentials)
  return fetch('https://strangers-things.herokuapp.com/api/2211-ftb-et-web-pt/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      return result;
    })
    .catch(console.error);
}

export const Register = ({ setToken, token }) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const handleSubmit = async event => {
        event.preventDefault();
        const userObj = await registerUser({
          user: {username,
          password}
        });
        setToken(userObj.data.token);


    }
    return(
        <form onSubmit={handleSubmit} class="register">
          <label class="box">
            <p class="hidden">Username</p>
            <input type="text" onChange={event => setUserName(event.target.value)} placeholder="New User Username..."/>
          </label>
          <label class="box">
            <p class="hidden">Password</p>
            <input type="password" onChange={event => setPassword(event.target.value)} placeholder="New User Password..."/>
          </label>
          <div class="box">
            <button type="submit">Register</button>
          </div>
        </form>
    )
}



export default Register;