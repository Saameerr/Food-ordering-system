import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem"; // Import the FoodItem component
import "./ItemDetailsPage.css";

const ItemDetailsPage = () => {
  const { id } = useParams(); // Get the item id from the URL parameter
  const { food_list } = useContext(StoreContext); // The list of food items
  const [item, setItem] = useState(null);
  const navigate = useNavigate(); // Navigate to other pages if needed

  // Fetch the item details based on the id from URL params
  useEffect(() => {
    const foundItem = food_list.find((food) => food._id === id);

    if (!foundItem) {
      // Redirect to home if the item is not found
      navigate("/");
    } else {
      // Set the item data if found
      setItem(foundItem);
    }
  }, [id, food_list, navigate]);

  // Display a loading state while fetching item data
  if (!item) {
    return <p>Loading...</p>;
  }

  return (
    <div className="item-details-page">
      <h2>Item Details</h2>
      <div className="food-item-container">
        {/* Use the FoodItem component to display details */}
        <FoodItem
          id={item._id}
          name={item.name}
          price={item.price}
          description={item.description}
          image={item.image}
        />
      </div>
    </div>
  );
};

export default ItemDetailsPage;
