import express from "express"
import { addTocart,removeFromCart,getCart, clearCart } from "../controllers/cartController.js"
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware, addTocart)
cartRouter.post("/remove",authMiddleware, removeFromCart)
cartRouter.post("/get",authMiddleware, getCart)
cartRouter.post("/clear", authMiddleware, clearCart); 


export default cartRouter;