import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  // State to manage ratings for each food item
  const [ratings, setRatings] = useState({});

  // Handle setting the rating
  const handleRating = (itemId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [itemId]: rating,
    }));
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt={name} />
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

        {/* Description overlay (only on hover) */}
        <div className="food-item-description-hover">
          <p>
            A refreshing blend of crisp lettuce, cucumbers, and fresh herbs,
            complemented by a tangy lemon vinaigrette and a sprinkle of seeds
            for added crunch.
          </p>
        </div>

        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p>
            {/* <img src={assets.rating_starts} alt="Rating" /> */}
          </div>
          <p className="food-item-desc">{description}</p>
          <p className="food-item-price">Rs.{price}</p>
        </div>
      </div>

      {/* Dynamic Star Rating */}
      <div className="food-item-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              fontSize: "20px",
              cursor: "pointer",
              color: star <= (ratings[id] || 0) ? "#ffc107" : "#e4e5e9",
            }}
            onClick={() => handleRating(id, star)}
          >
            ★
          </span>
        ))}
        <p>Rating: {ratings[id] || "No rating yet"}</p>
      </div>
    </div>
  );
};

export default FoodItem;
