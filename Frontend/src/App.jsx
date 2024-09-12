import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error from './Signup/Error';
import Login from './Signup/Login';
import Forgot_password from './Signup/Forgot_password';
import Register from './Signup/Register';
import Dashboard from './Home Page/Dashboard';

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot_password" element={<Forgot_password />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
