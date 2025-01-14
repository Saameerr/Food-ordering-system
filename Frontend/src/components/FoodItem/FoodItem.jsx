import React, { useContext, useState, useEffect } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  // State for rating
  const [rating, setRating] = useState(() => {
    // Retrieve rating from sessionStorage if available
    const savedRating = sessionStorage.getItem(`rating-${id}`);
    return savedRating ? parseFloat(savedRating) : 0; // Default to 0 if no rating saved
  });

  // Update sessionStorage whenever the rating changes
  useEffect(() => {
    sessionStorage.setItem(`rating-${id}`, rating);
  }, [rating, id]);

  // Handle rating selection
  const handleRating = (newRating) => {
    setRating(newRating); // Update rating state
  };

  // Render stars dynamically based on rating
  const renderStars = (currentRating) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      return (
        <span
          key={starValue}
          className={`star ${
            starValue <= currentRating ? "selected" : "unselected"
          }`}
          onClick={() => handleRating(starValue)}
          style={{
            cursor: "pointer",
            fontSize: "20px",
            color: starValue <= currentRating ? "#ffc107" : "#e4e5e9",
          }}
        >
          ★
        </span>
      );
    });
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={url + "/images/" + image}
          alt={name}
        />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Increase"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove"
            />
          </div>
        )}

        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p>
            <div className="food-item-stars">{renderStars(rating)}</div>
          </div>
          <p className="food-item-desc">{description}</p>
          <p className="food-item-price">Rs.{price}</p>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
