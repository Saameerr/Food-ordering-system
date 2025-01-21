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
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { getTotalItemsInCart, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [debouncedQuery]);

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

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!debouncedQuery.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:4000/api/food/list?search=${debouncedQuery}`
      );
      const data = await response.json();
      if (data.success) {
        setSearchResults(data.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const exactMatch = searchResults.find(
        (item) => item.name.toLowerCase() === searchQuery.toLowerCase()
      );

      if (exactMatch) {
        navigate(`/item/${exactMatch._id}`);
      } else {
        const categoryMatch = searchResults.filter((item) =>
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (categoryMatch.length > 0) {
          setSearchResults(categoryMatch);
        } else {
          setSearchResults([]);
          alert("No items found. Please refine your search.");
        }
      }
    }
  };

  const handleItemClick = (itemId, itemName) => {
    setSearchQuery(itemName); // Fill the search bar with the clicked item's name
    setSearchResults([]); // Immediately clear the search results
    navigate(`/item/${itemId}`); // Redirect to the item details page
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src="logo.png" alt="Logo" className="logo" />
      </Link>
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
      <div className="navbar-search-icon">
        <div className="navbar-search-container">
          <IoSearch
            id="icon"
            style={{ height: "25px", width: "25px", cursor: "pointer" }}
            onClick={handleSearch}
          />
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
        {debouncedQuery && searchResults.length > 0 && (
          <div className="search-results">
            <ul>
              {searchResults.map((item) => (
                <li
                  key={item._id}
                  onClick={() => handleItemClick(item._id, item.name)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
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
          <ul className={`nav-profile-dropdown ${dropdownOpen ? "show" : ""}`}>
            <li>
              <img src={assets.bag_icon} alt="Orders" />
              <span onClick={() => navigate("/MyOrders")}>Orders</span>
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
  );
};

export default Navbar;
