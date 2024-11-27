import React, { useState } from 'react';
import './Add.css';
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from 'react-toastify';

const Add = ({url}) => {

  
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",  // The initial category value should match case
  });

  // Handle input changes
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    // Create FormData object and append fields
    const formData = new FormData();  // Correct capitalization for FormData
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    
    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
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
      } else {
        // Handle error scenario
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error occurred while adding the item:", error);
    }
  };

  return (
    <div className='add'>
      <form action="" className="flex-col" onSubmit={onSubmitHandler}>
        <div className='add-img-upload'>
          <p style={{marginBottom:"10px"}}>Upload Image</p>
          <label htmlFor="image" className='image-label'>
            {image ? (
              <img src={URL.createObjectURL(image)} alt="Preview" className='image-preview' />
            ) : (
              <FaCloudUploadAlt className='img' />
            )}
          </label>
          <input 
            onChange={(e) => setImage(e.target.files[0])} 
            type="file" 
            id='image' 
            accept="image/*" 
            hidden 
            required 
          />
        </div>
        
        <div className='add-product-name flex-col'>
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Your Product Name' required />
        </div>

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required />
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
            <p style={{marginLeft:"50px"}}>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='Rs.50' required style={{marginLeft:"50px"}}/>
          </div>
        </div>

        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  );
};

export default Add;
