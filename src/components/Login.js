import React, { useEffect, useState } from 'react';
import { addNewUser, userLogin } from './Fetch'

async function loginUser(credentials) {
  console.log(credentials)
  return fetch('https://fitnesstrac-kr.herokuapp.com/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      return result
    })
    .catch(console.error);
}

export const Login = ({ setToken, token }) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const handleSubmit = async event => {
        event.preventDefault();
        const userObj = await loginUser({
          user: {username,
          password}
        });
        setToken(userObj.data.token);
        console.log("MMMMMMMMMMMMMMMMMM", token, username, password)
    }
    return(
        <form onSubmit={handleSubmit} class="login">
          <label class="box">
            <p>Username</p>
            <input type="text" onChange={event => setUserName(event.target.value)} placeholder="Username..."/>
          </label>
          <label class="box">
            <p>Password</p>
            <input type="password" onChange={event => setPassword(event.target.value)} placeholder="Password..."/>
          </label>
          <div class="box">
            <button type="submit">Login</button>
          </div>
        </form>
    )
}



export default Login;

