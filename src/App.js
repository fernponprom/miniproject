import React from 'react';
import Login from './components/Login/Login'
import Navbar from './components/Navbar/Navbar'
import './App.css';
import { Routes, Route, useRoutes } from 'react-router-dom';

import Content from './components/Content/Content'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element="" />
        <Route path="/content" element={<Content />} />
      </Routes>
    </div>
  );
}

export default App;
