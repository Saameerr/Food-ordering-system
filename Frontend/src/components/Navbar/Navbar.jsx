import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { IoSearch } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { getTotalItemsInCart, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  // Handle logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".navbar-profile")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="navbar">
      {/* Logo */}
      <Link to="/">
        <img src="logo.png" alt="Logo" className="logo" />
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

      {/* Search and Profile Section */}
      <div className="navbar-search-icon">
        <div className="navbar-search-container">
          <IoSearch
            id="icon"
            style={{ height: "25px", width: "25px", cursor: "pointer" }}
          />
          <input
            type="text"
            className="navbar-search-input"
            placeholder=" Search..."
          />
        </div>

        {/* Cart Icon */}
        <div className="navbar-shopping-cart">
          <Link to="/cart">
            <FaShoppingCart
              style={{ height: "25px", width: "25px", cursor: "pointer" }}
            />
          </Link>
          {getTotalItemsInCart() > 0 && (
            <div className="cart-item-count">{getTotalItemsInCart()}</div>
          )}
        </div>

        {/* Profile / Signin Section */}
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div
            className="navbar-profile"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <img
              src={assets.profile_icon}
              alt="Profile"
              className="profile-icon"
            />
            <ul
              className={`nav-profile-dropdown ${dropdownOpen ? "show" : ""}`}
            >
              <li>
                <img src={assets.bag_icon} alt="Orders" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
