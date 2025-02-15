import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder, userOrders, listOrders, updatestatus, getOrderedCount } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updatestatus);
orderRouter.get("/ordered-count/:foodId", getOrderedCount); // Add this route

export default orderRouter;