import userModel from "../models/userModel.js";

// Add items to user cart
const addTocart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData || {}; // Ensure cartData is initialized as an empty object if not already
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData || {};
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Fetch user cart data
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Clear the user's cart
const clearCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    
    // Check if userData exists
    if (!userData) {
      return res.status(404).json({ success: false, message: "User  not found" });
    }

    // Set the quantity of each item in the cart to zero
    userData.cartData = Object.keys(userData.cartData).reduce((acc, key) => {
      acc[key] = 0; // Set each item's quantity to 0
      return acc;
    }, {});

    // Save the updated cart to the database
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: userData.cartData }, { new: true });
    
    res.json({ success: true, message: "Cart item quantities reset to zero" });
  } catch (error) {
    console.error(error); // Use console.error for error logging
    res.status(500).json({ success: false, message: "Error resetting cart items", error: error.message });
  }
};

export { addTocart, removeFromCart, getCart, clearCart };
