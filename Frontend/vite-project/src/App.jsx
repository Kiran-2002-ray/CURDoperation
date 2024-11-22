import React from 'react';
import './App.css';
import Login from './Login';
import Signup from './Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DataDisplay from './DataDisplay';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/datadisplay' element={<DataDisplay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
