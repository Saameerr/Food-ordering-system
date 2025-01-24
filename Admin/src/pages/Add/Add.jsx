import React, { useState, useEffect } from 'react';
import './Add.css';
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Check if there's an item being edited
  const editingItem = location.state?.item;

  useEffect(() => {
    if (editingItem) {
      setData({
        name: editingItem.name,
        description: editingItem.description,
        price: editingItem.price,
        category: editingItem.category,
      });
      // Load existing image
      setImage(editingItem.image);
    }
  }, [editingItem]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "price" && value < 0) {
      toast.error("Price must be a positive number");
      return;
    }
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    // formData.append('id', editingItem._id); // Add the ID to the form data
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    
    // Only append the image if it's been selected
    if (image) {
      formData.append('image', image);
    } else if (editingItem?.image) {
      // If we are editing and no new image is selected, retain the previous image
      formData.append('image', editingItem.image);
    }
    // Conditionally append 'id' only if we're updating an item
if (editingItem) {
  formData.append('id', editingItem._id);
}

    try {
      let response;
      if (editingItem) {
        // If we are editing, send a PUT request
        response = await axios.put(`${url}/api/food/update/${editingItem._id}`, formData);
      } else {
        // If we are adding, send a POST request
        response = await axios.post(`${url}/api/food/add`, formData);
      }

      if (response.data.success) {
        // Reset form fields
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad", // Reset category to default
        });
        setImage(null); // Reset image to null
        toast.success(response.data.message)
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("Error occurred while saving item");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload">
          <p>Upload Image</p>
          <label htmlFor="image" className="image-label">
            {image ? (
              <img
                src={image instanceof File ? URL.createObjectURL(image) : `${url}/images/${image}`}
                alt="Preview"
                className="image-preview"
              />
            ) : (
              <FaCloudUploadAlt className="img" />
            )}
          </label>

          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            accept="image/*"
            hidden
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Your Product Name"
            required
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          />
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} value={data.category} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
              <option value="Pizza">Pizza</option>
              <option value="Thukpa">Thukpa</option>
              <option value="Chaumin">Chaumin</option>
              <option value="Burger">Burger</option>
              <option value="MOMO">MOMO</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="Rs.50"
              required
            />
          </div>
        </div>

        <button type="submit" className="add-btn">
          {editingItem ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default Add;
