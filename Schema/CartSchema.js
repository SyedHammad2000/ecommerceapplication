// import product from "@/pages/api/product";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const CartSchema = mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "user",
  },
  products: [
    {
      product: {
        type: ObjectId,
        ref: "product",
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
    },
  ],
});

const CartModel = mongoose.models.cart || mongoose.model("cart", CartSchema);

export default CartModel;
