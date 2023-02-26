import './App.css';
import React, { useState } from 'react';
import { Header, Login, Register, Posts, NewPost, Profile, Delete } from './components';

function App() {
  const [token, setToken] = useState('');
  return (
    <div className="App">
      <Header />
      <Login setToken={setToken} token={token} />
      <Register setToken={setToken} token={token}/>
      <Profile token={token}/>
      <Delete token={token}/>
      <NewPost token={token}/>
      <Posts token={token}/>
    </div>
  );
}

export default App;
