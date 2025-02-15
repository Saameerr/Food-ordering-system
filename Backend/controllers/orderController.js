import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import foodModel from "../models/foodModel.js"

// Placing user order for frontend
const placeOrder = async (req, res) => {
    try {
      const { userId, items, amount, address } = req.body;
  
      // Create the new order
      const newOrder = new orderModel({
        userId,
        items,
        amount,
        address,
      });
      await newOrder.save();
  
      // Increment the orderedCount for each item in the order
      for (const item of items) {
        await foodModel.findByIdAndUpdate(item._id, { $inc: { orderedCount: item.quantity } });
      }
  
      // Clear the user's cart
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
  
      res.json({ success: true, message: "Order placed successfully" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error placing order" });
    }
  };

//user orders for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId }).sort({ createdAt: -1 }); // Sort by `createdAt` descending
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};



//listing orders for admin pannel
const listOrders = async (req, res) => {
    try {
      const orders = await orderModel.find({}).sort({ createdAt: -1 }); // Sort by `createdAt` descending
      res.json({ success: true, data: orders });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
    }
  };

  // Fetch ordered count for a food item
const getOrderedCount = async (req, res) => {
    try {
      const { foodId } = req.params;
      const foodItem = await foodModel.findById(foodId);
      if (!foodItem) {
        return res.json({ success: false, message: "Food item not found" });
      }
      res.json({ success: true, orderedCount: foodItem.orderedCount });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error fetching ordered count" });
    }
  };
  

//api for updating order status
const updatestatus = async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status Updates"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}

export {placeOrder,userOrders,listOrders,updatestatus,getOrderedCount}