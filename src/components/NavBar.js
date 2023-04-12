import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { 
    Register, Home, Login, Activities, 
    Routines, AddRoutine, MyRoutines, AddActivity 
} from '.';

export const NavBar = ({ token, setToken }) => {
    const [user, setUser] = useState('')
    const navigate = useNavigate();

    const logout = (event) => {
        event.preventDefault();
        console.log('You have successfully logged out');
        localStorage.clear();
        sessionStorage.clear();
        navigate("/");
      }
    return (
        <nav>
        <button className='nav-button' id='nav-button'>
            <div className='navigation'>
                <Link className='home' to='/'>Home</Link>
                <Link className='login' to='/login'>Login</Link>
                <Link className='register' to='/register'>Register</Link>
                <Link className='activities' to='/activities'>Activities</Link>
                <Link className='routines' to='/routines'>Routines</Link>
                <Link className='addRoutine' to='/addroutine'>Add Routine</Link>
                <Link className='myroutines' to='/myroutines'>My Routines</Link>
                <Link className='addactivity' to='/addactivity'>Add Activity</Link>
                <Link className='logout' onClick={(event) => logout(event)}>Log Out</Link>
               
            </div>
        </button>
            <Routes id='mynav'>
                    <Route path='/' element={<Home token={token} setToken={setToken} />}/>
                    <Route path='/login' element={<Login token={token} setToken={setToken} user={user} setUser={setUser} />}/>
                    <Route path='/register' element={<Register token={token} setToken={setToken} user={user} setUser={setUser} />}/>
                    <Route path='/activities' element={<Activities token={token} setToken={setToken} />}/>
                    <Route path='/routines/*' element={<Routines token={token} setToken={setToken} />}/>
                    <Route path='/addroutine' element={<AddRoutine token={token} setToken={setToken} />}/>
                    <Route path='/myroutines' element={<MyRoutines token={token} setToken={setToken} user={user} setUser={setUser} />}/>
                    <Route path='/addactivity' element={<AddActivity token={token} setToken={setToken} user={user} setUser={setUser} />}/>

                    
            </Routes>
         </nav>

    )
};

export default NavBar;