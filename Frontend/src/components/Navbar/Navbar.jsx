import React, { useContext, useState } from "react";
import "./Navbar.css";
import { IoSearch } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false); // State for search bar

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  const { getTotalItemsInCart} = useContext(StoreContext);

  return (
    <div className="navbar">
      {/* logo */}

      <Link to="/">
        <img src="logo.png" alt="" className="logo" />
      </Link>

      {/* Navigation Menu */}

      <ul className="navbar-menu">
      <li
          onClick={() => {
            setMenu("Home");
            document
              .getElementById("home")
              .scrollIntoView({ behavior: "smooth" });
          }}
          className={menu === "Home" ? "active" : ""}
        >
          Home
        </li>
        
        <li
          onClick={() => {
            setMenu("Menu");
            document
              .getElementById("explore-menu")
              .scrollIntoView({ behavior: "smooth" });
          }}
          className={menu === "Menu" ? "active" : ""}
        >
          Menu
        </li>
        <li
          onClick={() => {
            setMenu("Mobile-app");
            document
              .getElementById("app-download")
              .scrollIntoView({ behavior: "smooth" });
          }}
          className={menu === "Mobile-app" ? "active" : ""}
        >
          Mobile-app
        </li>
        <li
          onClick={() => {
            setMenu("Contact us");
            document
              .getElementById("footer")
              .scrollIntoView({ behavior: "smooth" });
          }}
          className={menu === "Contact us" ? "active" : ""}
        >
          Contact us
        </li>
      </ul>

      {/* Search Icon */}

      <div className="navbar-search-icon">
        <div className="navbar-search-container">
          <IoSearch id="icon"
            style={{ height: "25px", width: "25px", cursor: "pointer" }}
          />

            <input
              type="text"
              className="navbar-search-input"
              placeholder=" Search..."
            />
        
        </div>

        {/* Cart Icon */}

        <div className="navbar-shopping-cart" >
  <Link to="/cart">
    <FaShoppingCart
      style={{ height: "25px", width: "25px", cursor: "pointer" }}
    />
  </Link>
  
  {/* Display the number of items in the cart */}
  {getTotalItemsInCart() > 0 && (
    <div className="cart-item-count">
      {getTotalItemsInCart()}
    </div>
  )}
</div>
        {/* Signin Button */}

        <button onClick={() => setShowLogin(true)}>Sign in</button>
      </div>
    </div>
  );
};

export default Navbar;