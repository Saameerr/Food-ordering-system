import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error from './Components/Error';
import Login from './Components/Login';
import Register from './Components/Register';

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
