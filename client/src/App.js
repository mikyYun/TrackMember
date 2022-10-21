import './App.css';
import React from 'react';
import {Routes, Route} from "react-router-dom"
import Login from './components/Login';
import Block from './components/Block';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path={`/:id`} element={<Block />} />
      </Routes>
    </div>
  );
}

export default App;
