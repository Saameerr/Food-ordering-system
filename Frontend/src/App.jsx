import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Login from "./components/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import Footer from "./components/Footer/Footer.jsx";
import C_home from "./components/Company/C_home.jsx";
import C_about from "./components/Company/C_about.jsx";
import C_delivery from "./components/Company/C_delivery.jsx";
import C_privacy from "./components/Company/C_privacy.jsx";
import PaymentForm from "./components/Payment/PaymentForm.jsx";
import Success from "./components/Payment/Success.jsx";
import Failure from "./components/Payment/Failure.jsx";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation(); // Get current route

  // Define the routes where the footer should NOT be displayed
  const hideFooterRoutes = ["/cart", "/order"];
  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : null}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="footer" element={<Footer />} />

          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<PlaceOrder />} />
          <Route path="paymentform" element={<PaymentForm />} />
          <Route path="payment-success" element={<Success />} />
          <Route path="payment-failure" element={<Failure />} />

          <Route path="c_home" element={<C_home />} />
          <Route path="c_about" element={<C_about />} />
          <Route path="c_delivery" element={<C_delivery />} />
          <Route path="c_privacy" element={<C_privacy />} />
        </Routes>

        {/* Conditionally render Footer only on non-Cart pages */}
        {!hideFooterRoutes.includes(location.pathname) && <Footer />}
      </div>
    </>
  );
};

export default App;
