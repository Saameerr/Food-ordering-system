import React, { useContext, useState, useEffect } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  // State to track order count
  const [orderCount, setOrderCount] = useState(() => {
    const savedCount = localStorage.getItem(`orderCount-${id}`);
    return savedCount ? parseInt(savedCount, 10) : 0; // Default to 0 if no order count saved
  });

  // Update localStorage whenever the order count changes
  useEffect(() => {
    localStorage.setItem(`orderCount-${id}`, orderCount);
  }, [orderCount, id]);

  // Handle item order
  const handleOrder = () => {
    addToCart(id);
    setOrderCount((prevCount) => prevCount + 1);
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
            onClick={handleOrder}
            src={assets.add_icon_white}
            alt="Add"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={handleOrder}
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
          <p className="food-item-name">
            {name}{" "}
            {orderCount > 0 && (
              <span className="order-count">({orderCount} Ordered)</span>
            )}
          </p>
          <p className="food-item-desc">{description}</p>
          <p className="food-item-price">Rs.{price}</p>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
