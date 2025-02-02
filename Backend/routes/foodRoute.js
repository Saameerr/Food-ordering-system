import express from "express";
import { addFood, listFood, removeFood, getFoodItems, updateFood } from "../controllers/foodController.js";
import multer from "multer"; // Using this will create image storage system

const foodRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Routes
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood); // Added a route to list all foods
foodRouter.post("/remove", removeFood);
foodRouter.get("/food-items", getFoodItems);
foodRouter.put("/update/:id", upload.single("image"), updateFood);


export default foodRouter;
