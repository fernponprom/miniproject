import React from 'react';
import Login from './components/Login/Login'
import Navbar from './components/Navbar/Navbar'
import './App.css';
import { Routes, Route, useRoutes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element="" />
      </Routes>
    </div>
  );
}

export default App;
