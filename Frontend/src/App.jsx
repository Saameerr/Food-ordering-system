import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Login from "./components/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import ItemDetailsPage from "./components/ItemDetails/ItemDetailsPage.jsx";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import Footer from "./components/Footer/Footer.jsx";
import C_home from "./components/Company/C_home.jsx";
import C_about from "./components/Company/C_about.jsx";
import C_delivery from "./components/Company/C_delivery.jsx";
import C_privacy from "./components/Company/C_privacy.jsx";
import C_esewa from "./components/Company/C_esewa.jsx";
import C_cod from "./components/Company/C_cod.jsx";
import PaymentForm from "./components/Payment/PaymentForm.jsx";
import Success from "./components/Payment/Success.jsx";
import Failure from "./components/Payment/Failure.jsx";
import MyOrders from "./pages/MyOrders/MyOrders.jsx";
// Import CategoryPage component
import CategoryPage from "./components/ItemDetails/CategoryPage.jsx"; // Adjust path if necessary

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation(); // Get current route

  // Define the routes where the footer should NOT be displayed
  const hideFooterRoutes = [
    "/cart",
    "/order",
    "/paymentform",
    "/payment-success",
    "/payment-failure",
    "/MyOrders",
  ];

  return (
    <>
      {showLogin && <Login setShowLogin={setShowLogin} />}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart setShowLogin={setShowLogin} />} />
          <Route path="/item/:id" element={<ItemDetailsPage />} /> {/* Route for item details */}
          
          {/* Add the route for category page */}
          <Route path="/category/:categoryName" element={<CategoryPage />} /> {/* Category page */}

          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/paymentform" element={<PaymentForm />} />
          <Route path="/payment-success" element={<Success />} />
          <Route path="/payment-failure" element={<Failure />} />

          {/* Company-related Routes */}
          <Route path="/c_home" element={<C_home />} />
          <Route path="/c_about" element={<C_about />} />
          <Route path="/c_delivery" element={<C_delivery />} />
          <Route path="/c_privacy" element={<C_privacy />} />
          <Route path="/c_esewa" element={<C_esewa />} />
          <Route path="/c_cod" element={<C_cod />} />
          
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>

        {/* Conditionally render Footer only on non-footer hidden routes */}
        {!hideFooterRoutes.includes(location.pathname) && <Footer />}
      </div>
    </>
  );
};

export default App;
