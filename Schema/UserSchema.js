// user schema
import mongoose from "mongoose";
// import { unique } from "next/dist/build/utils";
// create the model for users and expose it to our app

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin", "root"],
    },
  },
  {
    timestamps: true,
  }
);
const Users= mongoose.models.user || mongoose.model("user", UserSchema);
export default Users;