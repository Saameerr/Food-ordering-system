import React, { useState } from "react";
import "./Navbar.css";
import { IoSearch } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false); // State for search bar

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  return (
    <div className="navbar">
      {/* logo */}

      <img src="logo.png" alt="" className="logo" />

      {/* Navigation Menu */}

      <ul className="navbar-menu">
        <li
          onClick={() => setMenu("Home")}
          className={menu === "Home" ? "active" : ""}
        >
          Home
        </li>
        <li
          onClick={() => setMenu("Menu")}
          className={menu === "Menu" ? "active" : ""}
        >
          Menu
        </li>
        <li
          onClick={() => setMenu("Mobile-app")}
          className={menu === "Mobile-app" ? "active" : ""}
        >
          Mobile-app
        </li>
        <li
          onClick={() => setMenu("Contact us")}
          className={menu === "Contact us" ? "active" : ""}
        >
          Contact us
        </li>
      </ul>

      {/* Search Icon */}

      <div className="navbar-search-icon">
        <div className="navbar-search-container">
          <IoSearch
            style={{ height: "25px", width: "25px", cursor: "pointer" }}
            onClick={toggleSearch}
          />
          {isSearchExpanded && (
            <input
              type="text"
              className="navbar-search-input"
              placeholder=" Search..."
            />
          )}
        </div>

        {/* Cart Icon */}

        <div className="navbar-shopping-cart">
          <FaShoppingCart
            style={{ height: "25px", width: "25px", cursor: "pointer" }}
          />
          <div className="dot"></div>
        </div>

        {/* Signin Button */}

        <button onClick={() => setShowLogin(true)}>Sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
