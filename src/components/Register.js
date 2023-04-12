import React, { useState } from 'react';


async function registerUser(credentials) {
  console.log(credentials)
  const {username, password} = credentials.user
  console.log("AAAAAAAAA", username, password)
  try {
  const response = await fetch('https://fitness-tracker-gsjx.onrender.com/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: username,
        password: password
    })
  })

      const result = await response.json();
      localStorage.setItem('token', result.token)
      console.log(result)
      if (result.error === "Duplicate Username") {
        window.alert("Username is already taken")
      }

      if (result.error === "Short password") {
        window.alert("Password Too Short")
      }
      
      return result

    } catch (error) {
      console.log(error)
    }
    
}

export const Register = ({ setToken, token, user, setUser }) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const handleSubmit = async event => {
        event.preventDefault();
        const userObj = await registerUser({
          user: {username,
          password}
        });
        
        console.log("MMMMMMMMMMMMMMMMMM", userObj.token, userObj.user.username)
        setToken(userObj.token);
        setUser(userObj.user.username)
        localStorage.setItem('token', userObj.token)
        event.target.reset();


    }
    return(
        <form onSubmit={handleSubmit} class="registerForm">
          <label class="box">
            <h4>Please Register New Account</h4>
            <p>Username</p>
              <input 
                type="text" 
                onChange={event => setUserName(event.target.value)} 
                placeholder="New User Username..."
              />
          </label>
          <label class="box">
            <p>Password</p>
              <input 
                type="password" 
                onChange={event => setPassword(event.target.value)} 
                placeholder="New User Password..."
              />
          </label>
          <div class="box">
            <button type="submit">Register</button>
          </div>
        </form>
    )
}



export default Register;