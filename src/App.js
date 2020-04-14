import React , {useState, useEffect} from 'react';
import {firestore} from './index'
import Navbar from './components/Navbar/Navbar'
import Content from './components/Content/Content'
import Login  from './components/Login/Login'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home'

import './App.css'

const App = () => {

  
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Content /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
