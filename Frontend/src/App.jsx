
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Login from "./components/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import Footer from "./Footer/Footer.jsx";
import C_home from "./components/Company/C_home.jsx"
import C_about from "./components/Company/C_about.jsx"
import C_delivery from "./components/Company/C_delivery.jsx"
import C_privacy from "./components/Company/C_privacy.jsx"

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : null}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />

          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<PlaceOrder />} />

          <Route path="c_home" element={<C_home />} />
          <Route path="c_about" element={<C_about />} />
          <Route path="c_delivery" element={<C_delivery />} />
          <Route path="c_privacy" element={<C_privacy />} />


          
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
