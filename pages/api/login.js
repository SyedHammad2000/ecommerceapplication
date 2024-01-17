//
import Users from "@/Schema/UserSchema";
// import bcrypt from "bcrypt";
import connectDB from "@/helper/Mongodb";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const JWT_SECRET = "adsadsadas";
  const { email, password } = req.body;
  connectDB();
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }
    let user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    // const isMatchPass = await bcrypt.compare(password, user.password);
    const isMatchPass = (await password) === user.password;

    if (isMatchPass) {
      const token = jwt.sign(
        {
          user_id: user._id,
        },
        JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      const { email, role, name } = user;

      return res
        .status(200)
        .json({ message: "Success", token, user: { email, name, role } });
    } else {
      return res.status(200).json({ message: "Invalid Password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something Went Wrong" });
  }
}
