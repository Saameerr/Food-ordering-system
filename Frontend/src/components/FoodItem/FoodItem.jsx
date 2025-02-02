import React, { useContext, useState, useEffect } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  
  const [orderCount, setOrderCount] = useState(() => {
    const savedCount = localStorage.getItem(`orderCount-${id}`);
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    localStorage.setItem(`orderCount-${id}`, orderCount);
  }, [orderCount, id]);

  const handleOrder = () => {
    addToCart(id);
    setOrderCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={url + "/images/" + image} alt={name} />
        {!cartItems[id] ? (
          <img className="add" onClick={handleOrder} src={assets.add_icon_white} alt="Add" />
        ) : (
          <div className="food-item-counter">
            <img onClick={handleOrder} src={assets.add_icon_green} alt="Increase" />
            <p>{cartItems[id]}</p>
            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="Remove" />
          </div>
        )}

        <div className="food-item-info">
          <p className="food-item-name">
            {name} {orderCount > 0 && <span className="order-count">({orderCount} Ordered)</span>}
          </p>
          <p className="food-item-desc">
            {isExpanded ? description : description.split(" ").slice(0, 8).join(" ") + (description.split(" ").length > 8 ? "..." : "")}
         
          {description.split(" ").length > 8 && (
            <label className="read-more" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "Show Less" : "Read More"}
            </label>
          )}
           </p>
          <p className="food-item-price">Rs. {price}</p>
        </div>
      </div>
    </div>
    
  );
};

export default FoodItem;
