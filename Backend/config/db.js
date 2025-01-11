import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://sameer:1218@cluster0.gajfl.mongodb.net/Food-ordering-system');
    console.log("DB connected");
  } catch (error) {
    console.log("Error connecting to DB:", error);
    process.exit(1); // Exit the process with failure
  }
};
