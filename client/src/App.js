import './App.css';
import React from 'react';
import {Routes, Route, useNavigate} from "react-router-dom"
import Login from './components/Login';
import Block from './components/Block';
import Main from './components/Main';
import Cookies from "universal-cookie"
import RedirectMain from './components/RedirectMain';



function App() {
  const cookie = new Cookies();
  const navigate = useNavigate();
  const navigateTo = (path, interval) => {
    setTimeout(() => navigate(path), interval);
  };
  // console.log("COOKIE", cookie, cookie.set)
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login cookie={cookie} navigateTo={navigateTo}/>} />
        <Route path="/" element={<Login cookie={cookie} navigateTo={navigateTo}/>} />
        <Route path="/main" element={<Main cookie={cookie} navigateTo={navigateTo}/>} />
        <Route path="/main/:token" element={<RedirectMain cookie={cookie} navigateTo={navigateTo}/>} />
        <Route path={`/:id`} element={<Block />} />
        <Route path={`/block`} element={<Block />} />
      </Routes>
    </div>
  );
}

export default App;
