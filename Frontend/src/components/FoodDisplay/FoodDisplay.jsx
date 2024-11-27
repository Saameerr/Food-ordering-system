import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  // Filter the food list based on the category
  const filteredFoodItems = food_list.filter(item => category === "All" || category === item.category);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes Near You</h2>
      
      <div className="food-display-list">
        {filteredFoodItems.length === 0 ? (
          // Show "Items not found" if no items match the selected category
          <p className="no-items-message">Opps! Items not found</p>
        ) : (
          // Render the FoodItem components if items are found
          filteredFoodItems.map((item, index) => (
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
      </div> <br /><br />
      <hr />
    </div>
  );
};

export default FoodDisplay;
