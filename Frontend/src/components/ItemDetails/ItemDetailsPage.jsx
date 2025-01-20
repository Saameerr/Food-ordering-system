import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Ensure correct imports
import { StoreContext } from "../../Context/StoreContext";

const ItemDetailsPage = () => {
  const { id } = useParams();  // Get the item id from the URL parameter
  const { food_list } = useContext(StoreContext);  // The list of food items
  const [item, setItem] = useState(null);
  const navigate = useNavigate();  // Navigate to other pages if needed

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
      <h2>{item.name}</h2>
      <img src={item.image} alt={item.name} />
      <p>{item.description}</p>
      <p>Price: ${item.price}</p>
    </div>
  );
};

export default ItemDetailsPage;
