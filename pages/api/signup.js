// import mongoose from "mongoose";
// import bcrypt from "bcrypt";
import CartModel from "@/Schema/CartSchema";
import Users from "@/Schema/UserSchema";
import connectDB from "@/helper/Mongodb";

export default async function handler(req, res) {
  //   if (req.method !== "POST") {
  //     return res.status(500).end();
  //   }

  const { name, email, password } = req.body;
  console.log("user", req.body);
  try {
    connectDB();
    //validation
    if (!name || !email || !password) {
      res.status(400).json({ error: "please add all fields" });
      console.log("Please add");
    }
    const user = await Users.findOne({ email });
    if (user) {
      return res.status(200).json({ message: "user already exists" });
    }
    // const hashedpassword = await bcrypt.hash(password, 12);
    const newUser = await new Users({
      name,
      email,
      password,
    }).save();
    console.log(newUser);

    await new CartModel({
      user: newUser._id,
    }).save();
    // console.log(cart);

    res.status(200).json({ message: "user created successfully" }, newUser);
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: "Something Went Wrong" });
  }
}
