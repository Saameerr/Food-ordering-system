import React, { useContext, useState, useEffect, useRef } from "react";
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
  const { getTotalItemsInCart, token, setToken, food_list } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const searchRef = useRef(null); // Reference to the search bar and results container

  // Debounced Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle Search
  useEffect(() => {
    if (debouncedQuery.trim()) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [debouncedQuery]);

  // Logout functionality
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  // Perform search based on the debounced query
  const handleSearch = () => {
    if (!debouncedQuery.trim()) return;

    const filteredResults = food_list.filter(
      (item) =>
        item.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  // Handle Enter key press to select search result
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const exactMatch = searchResults.find((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (exactMatch) {
        // Redirect to the item details page
        setSearchResults([]); // Clear search results
        navigate(`/item/${exactMatch._id}`);
      } else {
        // Check if query matches a category and navigate
        const categoryMatch = food_list.filter((item) =>
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (categoryMatch.length > 0) {
          // Redirect to the category page
          setSearchResults([]); // Clear search results
          navigate(`/category/${searchQuery.toLowerCase()}`);
        } else {
          setSearchResults([]); // Clear search results if no match
          alert("No items found. Please refine your search.");
        }
      }
    }
  };

  // Handle click on an item from search results
  const handleItemClick = (itemId, itemName) => {
    setSearchQuery(itemName); // Fill the search bar with the clicked item's name
    setSearchResults([]); // Immediately clear the search results
    navigate(`/item/${itemId}`); // Redirect to the item details page
  };

  // Function to handle menu navigation
  const handleMenuClick = (menuName, sectionId) => {
    setMenu(menuName);
  
    if (sectionId === "cart") {
      navigate("/cart"); // Navigate to Cart
    } 
    else if (sectionId === "explore-menu" || sectionId === "footer") {
      if (location.pathname !== "/") {
        navigate("/"); // Navigate to Home if not already there
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }
    } 
    else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      } else {
        console.warn(`Element with id '${sectionId}' not found.`);
      }
    }
  };
  

  // Close search results when clicked outside of the search bar or search results
  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setSearchResults([]); // Clear search results
    }
  };

  // Set up event listener for clicks outside the search bar and results
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      <Link to="/">
        <img src="logo.png" alt="Logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <li
        
          onClick={() => handleMenuClick("Home", "home")}
          className={menu === "Home" ? "active" : ""}
        >
          <Link to="/">Home</Link>
        </li>
        <li
          onClick={() => handleMenuClick("Menu", "explore-menu")}
          className={menu === "Menu" ? "active" : ""}
        >
         Menu
        </li>
        <li
          onClick={() => handleMenuClick("Contact us", "footer")}
          className={menu === "Contact us" ? "active" : ""}
        >
          Contact us
        </li>
      </ul>
      <div className="navbar-search-icon" ref={searchRef}>
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
            onChange={(e) => setSearchQuery(e.target.value)}
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
          <div
            className="navbar-shopping-cart"
            onClick={() => handleMenuClick("Cart", "cart")}
          >
            <FaShoppingCart
              style={{ height: "25px", width: "25px", cursor: "pointer" }}
            />
            {getTotalItemsInCart() > 0 && (
              <div className="cart-item-count">{getTotalItemsInCart()}</div>
            )}
          </div>
        </Link>
        {/* {getTotalItemsInCart() > 0 && (
          <div className="cart-item-count">{getTotalItemsInCart()}</div>
        )} */}
      </div>
      {!token ? (
        <button
          onClick={() =>
            setShowLogin(true) || handleMenuClick("Sign in", "signin")
          }
        >
          Sign in
        </button>
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
            <li style={{ marginLeft: "-1rem" }}>
              <img src={assets.bag_icon} alt="Orders" />
              <span
                onClick={() =>
                  navigate("/MyOrders") || handleMenuClick("Orders", "orders")
                }
              >
                Orders
              </span>
            </li>
            <hr style={{ marginLeft: "-2rem" }} />
            <div style={{ marginTop: "-10px", paddingBottom: "15px" }}>
              <li onClick={logout} style={{ marginLeft: "-1rem" }}>
                <img src={assets.logout_icon} alt="Logout" />
                <span onClick={() => handleMenuClick("Logout", "logout")}>
                  Logout
                </span>
              </li>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
