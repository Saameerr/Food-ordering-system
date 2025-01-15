import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//placing user order for frontend
const placeOrder = async(req,res)=>{
   const frontend_url = "http://localhost:5173";
    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}

//user orders for frontend
const userOrders = async(req,res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
        
    }

}

export {placeOrder,userOrders}