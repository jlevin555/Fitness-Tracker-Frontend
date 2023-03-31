import './App.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { NavBar } from './components';

function App() {
  const [token, setToken] = useState('');
  return (
    <NavBar token={token} setToken={setToken}/>
  );
}

export default App;
