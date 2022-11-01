import './App.css';
import React from 'react';
import {Routes, Route} from "react-router-dom"
import Login from './components/Login';
import Block from './components/Block';
import Main from './components/Main';
import Cookies from "universal-cookie"
import RedirectMain from './components/RedirectMain';

function App() {
  const cookie = new Cookies();
  // console.log("COOKIE", cookie, cookie.set)
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login cookie={cookie}/>} />
        <Route path="/" element={<Login cookie={cookie}/>} />
        <Route path="/main" element={<Main cookie={cookie}/>} />
        <Route path="/main/:token" element={<RedirectMain cookie={cookie}/>} />
        <Route path={`/:id`} element={<Block />} />
        <Route path={`/block`} element={<Block />} />
      </Routes>
    </div>
  );
}

export default App;
