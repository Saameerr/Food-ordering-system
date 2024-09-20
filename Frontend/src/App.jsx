import React, { useState } from "react";
import {Route, Routes} from 'react-router-dom'
import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Login from "./components/Login/Login.jsx";
import Home from './pages/Home/Home.jsx'
import Cart from "./pages/Cart/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import Footer from "./Footer/Footer.jsx";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : null}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<PlaceOrder />} />
        </Routes> 
      </div>
      <Footer />
    </>
  );
};

export default App;
