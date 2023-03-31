import React, { useEffect, useState } from 'react';
import { addNewUser, userLogin } from './Fetch'

async function registerUser(credentials) {
  console.log(credentials)
  const {username, password} = credentials.user
  console.log("AAAAAAAAA", username, password)
  return fetch('https://fitnesstrac-kr.herokuapp.com/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: {
        username: username,
        password: password
      }
    })
  })
    .then(response => {
      console.log("BBBBBBBBBBBBB", response)
      response.json()})
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
            <p>Username</p>
            <input type="text" onChange={event => setUserName(event.target.value)} placeholder="New User Username..."/>
          </label>
          <label class="box">
            <p>Password</p>
            <input type="password" onChange={event => setPassword(event.target.value)} placeholder="New User Password..."/>
          </label>
          <div class="box">
            <button type="submit">Register</button>
          </div>
        </form>
    )
}



export default Register;