import './App.css';
import React from 'react';
import {Routes, Route} from "react-router-dom"
import Login from './components/Login';
import Block from './components/Block';
import Main from './components/Main';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path={`/:id`} element={<Block />} />
        <Route path={`/block`} element={<Block />} />
      </Routes>
    </div>
  );
}

export default App;
