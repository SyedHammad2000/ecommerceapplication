import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // if (mongoose.connection.readyState) {
    //   console.log("Already connected");
    //   return;
    // }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
