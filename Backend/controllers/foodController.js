import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// List of all food items with search functionality and optional category filter
const listFood = async (req, res) => {
  const search = req.query.search || ""; // Retrieve the search query
  const category = req.query.category || ""; // Retrieve the category query

  try {
    // Prepare query object
    let query = {};

    // Apply search filter if search term exists
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } }, // Case-insensitive search for name
        { category: { $regex: search, $options: "i" } }, // Case-insensitive search for category
      ];
    }

    // Apply category filter if a category is specified
    if (category) {
      query.category = { $regex: category, $options: "i" }; // Case-insensitive search for category
    }

    // Fetch food items based on the filters
    const foods = await foodModel.find(query);

    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching food items" });
  }
};

// Remove food items
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Controller to get food items with orderCount > 0
const getFoodItems = async (req, res) => {
  try {
    const foodItems = await foodModel.find({ orderCount: { $gt: 0 } });
    res.json({ success: true, data: foodItems });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error fetching food items" });
  }
};


// Update food item
const updateFood = async (req, res) => {
  try {
    const { id, name, description, price, category } = req.body;

    // Find the food item by ID
    const food = await foodModel.findById(id);
    if (!food) {
      return res.json({ success: false, message: "Food item not found" });
    }

    // If there's a new image, delete the old one from the server and update image
    if (req.file) {
      fs.unlink(`uploads/${food.image}`, (err) => {
        if (err) console.log(err);
      });
      food.image = req.file.filename; // Update the image filename
    }

    // Update other food fields
    food.name = name || food.name;
    food.description = description || food.description;
    food.price = price || food.price;
    food.category = category || food.category;

    // Save the updated food item
    await food.save();

    res.json({ success: true, message: "Food Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating food" });
  }
};

export { addFood, listFood, removeFood, getFoodItems, updateFood };
