import React, { useContext, useState } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredFoodItems = food_list.filter(
    (item) => category === "All" || category === item.category
  );

  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes Near You</h2>

      <div className="food-display-list">
        {filteredFoodItems.length === 0 ? (
          <p className="no-items-message">Oops! Items not found</p>
        ) : (
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

      {filteredFoodItems.length > 0 && (
        <div className="load-buttons">
          <button onClick={() => setVisibleCount((prev) => Math.min(prev + 12, filteredFoodItems.length))}>
            Load More
          </button>
          {visibleCount > 12 && (
            <button onClick={() => setVisibleCount((prev) => Math.max(prev - 12, 12))}>
              Load Less
            </button>
          )}
        </div>
      )}

      <br />
      <br />
      <hr />
    </div>
  );
};

export default FoodDisplay;
