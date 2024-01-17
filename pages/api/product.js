import Topic from "@/Schema/ProductSchema";
import connectDB from "@/helper/Mongodb";
import React from "react";

connectDB();
// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {
  switch (req.method) {
    case "GET":
      GetAllProducts(req, res);
      break;
    case "POST":
      await AddProduct(req, res);
      break;
  }
}

const GetAllProducts = async (req, res) => {
  try {
    const product = await Topic.find();
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something Went Wrong" });
  }
};
const AddProduct = async (req, res) => {
  try {
    const { name, price, description, mediaurl } = req.body;
    if (!name || !price || !description || !mediaurl) {
      res.status(500).json({ error: "Please provide all fields" });
    }
    const product = await new Topic({ name, price, description, mediaurl });
    product.save();

    res.status(200).send({ product, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something Went Wrong" });
  }
};
