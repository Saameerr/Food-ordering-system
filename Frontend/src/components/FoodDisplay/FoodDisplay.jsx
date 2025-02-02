import React, { useContext, useState } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [visibleCount, setVisibleCount] = useState(12);
  const [expanded, setExpanded] = useState(false);

  const filteredFoodItems = food_list.filter(
    (item) => category === "All" || category === item.category
  );

  const handleLoadMore = () => {
    setVisibleCount((prevCount) =>
      Math.min(prevCount + 12, filteredFoodItems.length)
    );
  };

  const handleLoadLess = () => {
    setVisibleCount((prevCount) => Math.max(prevCount - 12, 12));
  };

  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes Near You</h2>

      <div className="food-display-list">
        {filteredFoodItems.length === 0 ? (
          // Show "Items not found" if no items match the selected category
          <p className="no-items-message">Opps! Items not found</p>
        ) : (
          // Render only the visible FoodItem components
          filteredFoodItems
            .slice(0, visibleCount)
            .map((item, index) => (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            ))
        )}
      </div>
      <div className="load-buttons">
        <button onClick={handleLoadMore}>Load More</button>
        {visibleCount > 12 && (
          <button onClick={handleLoadLess}>Load Less</button>
        )}
      </div>
      <br />
      <br />
      <hr />
    </div>
  );
};

export default FoodDisplay;
