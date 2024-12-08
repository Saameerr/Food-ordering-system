import React, { useRef } from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";

const ExploreMenu = ({ category, setCategory }) => {
  const menuRef = useRef(null);

  // Function to scroll right
  const handleScrollRight = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: 500, behavior: "smooth" }); // Scroll 500px to the right
    }
  };

  // Function to scroll left
  const handleScrollLeft = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: -500, behavior: "smooth" }); // Scroll 500px to the left
    }
  };

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <div className="explore-menu-container">
        {/* Left scroll button */}
        <button className="scroll-button left" onClick={handleScrollLeft}>
        <FaLongArrowAltLeft  className="arrow-icon"/>
        </button>

        {/* Menu items */}
        <div className="explore-menu-list" ref={menuRef}>
          {menu_list.map((item, index) => (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt=""
              />
              <p>{item.menu_name}</p>
            </div>
          ))}
        </div>

        {/* Right scroll button */}
        <button className="scroll-button right" onClick={handleScrollRight}>
        <FaLongArrowAltRight className="arrow-icon" />
        </button>
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
