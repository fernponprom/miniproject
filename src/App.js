import React from 'react';
import Navbar from './components/Navbar/Navbar'
import Content from './components/Content/Content'
import Login  from './components/Login/Login'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home'
import Signup from './components/Signup/Signup'

import './App.css'

const App = () => {

  
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Content /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
