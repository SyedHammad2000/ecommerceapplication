import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mediaurl: [
    {
      type: String,
      required: true,
    },
  ],
});

const Topic = mongoose.models.product||mongoose.model("product", ProductSchema);
export default Topic
