import React from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem"; // Import FoodItem component to display individual items
import './CategoryPage.css'

const CategoryPage = () => {
  const { categoryName } = useParams(); // Get the category name from the URL
  const { food_list } = React.useContext(StoreContext); // Access the list of food items

  // Filter food items based on category
  const categoryItems = food_list.filter((item) =>
    item.category.toLowerCase().includes(categoryName.toLowerCase())
  );

  return (
    <div>
      {/* <h2>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Items</h2> */}
      <h2>Item Details</h2>
      {categoryItems.length > 0 ? (
        <div className="item-details">
          {/* Map over the filtered items and display each one */}
          {categoryItems.map((item) => (
            <div key={item._id} className="food-item">
              {/* Display each item using the FoodItem component */}
              <FoodItem
                id={item._id}
                name={item.name}
                price={item.price}
                description={item.description}
                image={item.image}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No items available in this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
