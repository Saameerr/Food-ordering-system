import foodModel from "../models/foodModel.js";
import fs from 'fs'


//add food item

const addFood = async (req,res)=> {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel ({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })

    try {
        await food.save();
        res.json({success:true, message:"Food Added Successfully"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
        
    }

}

// List of all food items with search functionality
const listFood = async (req, res) => {
    const search = req.query.search || ""; // Retrieve the search query
    try {
      // Use a regex to perform a case-insensitive search on the food name
      const foods = await foodModel.find({
        $or: [
          { name: { $regex: search, $options: "i" } },  // Case-insensitive search for name
          { category: { $regex: search, $options: "i" } } // Case-insensitive search for category
        ]
      });
      
      res.json({ success: true, data: foods });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error fetching food items" });
    }
  };
  


    //Remove food items
    const removeFood = async (req,res)=>{
        try {
            const food = await foodModel.findById(req.body.id);
            fs.unlink(`uploads/${food.image}`,()=>{})

            await foodModel.findByIdAndDelete(req.body.id);
            res.json({success:true, message:"Food Removed Successfully"})
        } catch (error) {
            console.log(error);
            res.json({success:false,message:"Error"})
            
        }

    }

    
    export { addFood, listFood, removeFood };