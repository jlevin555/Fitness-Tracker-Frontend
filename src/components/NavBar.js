import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { Register, Home, Login, Activities, Routines } from '.';

export const NavBar = ({ token, setToken }) => {

    return (
        <>
        <div className='navigation'>
            <Link className='home' to='/home'>Home</Link>
            <Link className='login' to='/login'>Login</Link>
            <Link className='register' to='/register'>Register</Link>
            <Link className='activities' to='/activities'>Activities</Link>
            <Link className='routines' to='/routines'>Routines</Link>
            {/* <Link className='loginTab' to='/Login'>Login</Link> */}
            {/* <Link className='registerTab' to='/Register'>Register</Link> */}
            {/* <Link className='profileTab' to='/Profile'>Profile</Link> */}
            {/* <Link className='logout' onClick={(event) => logout(event)}>Log Out</Link> */}
        </div>
            <Routes>
                    <Route path='/home' element={<Home token={token} setToken={setToken}/>}/>
                    <Route path='/login' element={<Login token={token} setToken={setToken}/>}/>
                    <Route path='/register' element={<Register token={token} setToken={setToken}/>}/>
                    <Route path='/activities' element={<Activities token={token} setToken={setToken}/>}/>
                    <Route path='/routines' element={<Routines token={token} setToken={setToken}/>}/>
                    {/* <Route path='/Login' element={<Login/>}/> */}
                    {/* <Route path='/Register' element={<Register/>}/> */}
                    {/* <Route path='/Message' element={<Message/>}/> */}
                    {/* <Route path='/Profile' element={<Profile token={token} />}/> */}
                    
            </Routes>
         </>   
    )
};

export default NavBar;