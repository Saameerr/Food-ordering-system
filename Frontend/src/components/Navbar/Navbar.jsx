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

  // Debouncing state for search query
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    // Debounce search query to avoid triggering search too frequently
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // Wait 500ms after the user stops typing

    return () => {
      clearTimeout(timer); // Clean up on each re-render
    };
  }, [searchQuery]);

  useEffect(() => {
    // Trigger search when the debounced query changes
    if (debouncedQuery.trim()) {
      handleSearch();
    } else {
      setSearchResults([]); // Clear results when search is empty
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
    if (!debouncedQuery.trim()) return; // Exit if search query is empty

    try {
      const response = await fetch(
        `http://localhost:4000/api/food/list?search=${debouncedQuery}`
      );
      const data = await response.json();
      if (data.success) {
        // Check if the query matches an item's name
        const exactMatch = data.data.find(
          (item) => item.name.toLowerCase() === debouncedQuery.toLowerCase()
        );

        if (exactMatch) {
          // If an exact match is found, filter items by category
          const categoryItems = data.data.filter(
            (item) =>
              item.category.toLowerCase() === exactMatch.category.toLowerCase()
          );
          setSearchResults(categoryItems); // Show items in the same category
        } else {
          // If no exact match, show all items matching the query
          setSearchResults(data.data);
        }
      } else {
        setSearchResults([]); // Clear results in case of error
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]); // Clear results in case of error
    }
  };

  const handleItemClick = (itemName) => {
    setSearchQuery(itemName); // Update the search input with the clicked item's name
    setDebouncedQuery(itemName); // Trigger the search logic immediately
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const exactMatch = searchResults.find(
        (item) => item.name.toLowerCase() === searchQuery.toLowerCase()
      );

      if (exactMatch) {
        // Redirect to ItemDetailsPage for exact match
        navigate(`/item/${exactMatch._id}`);
      } else {
        // Find items by category if exact match is not found
        const categoryMatch = searchResults.filter((item) =>
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (categoryMatch.length > 0) {
          // If items from the same category are found, display them
          setSearchResults(categoryMatch);
        } else {
          // If no items are found by name or category, show no results
          setSearchResults([]); // Clear results
          alert("No items found. Please refine your search.");
        }
      }
    }
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
            onKeyDown={handleKeyDown} // Trigger redirect or handle "No results" on Enter
          />
        </div>
        {debouncedQuery && (
          <div className="search-results">
            {searchResults.length > 0 ? (
              <ul>
                {searchResults.map((item) => (
                  <li
                    key={item._id}
                    onClick={() => handleItemClick(item.name)} // Pass the item's name to the function
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No results found.</p>
            )}
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
