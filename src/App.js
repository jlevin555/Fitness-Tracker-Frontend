import './App.css';
import React, { useState, useEffect } from 'react';
import { Header, NavBar } from './components';

export const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksI…3NTZ9.E1yZP_CLYYwezegawt2H6veFutcPCuLjWfTfM0HnyqA`

function App() {
  const [token, setToken] = useState('');
  
  useEffect(() => {
    const savedToken = localStorage.getItem('token', token)
    if(savedToken) {
      setToken(savedToken)
    }
  }, [])
  return (
    <div className='container'>
    <Header />
    <NavBar token={token} setToken={setToken}/>

    </div>
  );
}

export default App;
