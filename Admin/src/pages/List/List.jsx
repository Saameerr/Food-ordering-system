import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  // Fetch the list of food items from the backend
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch food list.");
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
      toast.error("Error fetching food list.");
    }
  };

  // Remove food item from the list
  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        await fetchList(); // Refetch the list after deleting
        toast.success(response.data.message);
      } else {
        toast.error("Error deleting food item.");
      }
    } catch (error) {
      console.error("Error deleting food:", error);
      toast.error("Error deleting food item.");
    }
  };

  // Navigate to the Add page with food item data for editing
  const editFood = (item) => {
    navigate('/add', { state: { item, isEditing: true } });  // Passing item details and edit mode flag
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p style={{ fontSize: "30px", fontWeight: "bold", textAlign: "center", marginBottom: "10px" }}>
        All Foods List
      </p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/` + item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>Rs. {item.price}</p>
            <div className="actions">
              <button onClick={() => editFood(item)} className="edit-btn">
                Edit
              </button>
              <button onClick={() => removeFood(item._id)} className="delete-btn">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
