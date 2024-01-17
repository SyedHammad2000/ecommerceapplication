// create cart api
import CartModel from "@/Schema/CartSchema";
import Topic from "@/Schema/ProductSchema";
import jwt from "jsonwebtoken";
// import product from "./product";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {
  switch (req.method) {
    case "GET":
      await FetchuserCart(req, res);
      break;
    case "PUT":
      await AddtoCart(req, res);
      break;
    case "DELETE":
      await RemoveProduct(req, res);
      break;
  }
}
const JWT_SECRET = "adsadsadas";

function Authenticated(icomponent) {
  
  
  return (req, res) => {
    const { authorization } = req.headers;
    try {
      if (!authorization) {
        return res.status(401).json({ error: "please login first" });
      }
      const { user_id } = jwt.verify(authorization, JWT_SECRET);
      req.user_id = user_id;
      icomponent(req, res);
    } catch (error) {
      res.status(500).json({ error: "something went wrong" });
    }
  };
}

const FetchuserCart = Authenticated(async (req, res) => {
  const data = await CartModel.findOne({ user: req.user_id }).populate(
    "products.product"
  );
  res.status(200).json(data);
});

const AddtoCart = Authenticated(async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const cart = await CartModel.findOne({ user: req.user_id });
    if (!cart) {
      res.status(400).json({ message: "id not found" });
    }
    // find the cart item
    const ItemExist = cart.products.find(
      (item) => item.product.toString() === productId
    );
    if (ItemExist) {
      await CartModel.findOneAndUpdate(
        {
          _id: cart._id,
          "products.product": productId,
        },
        {
          $inc: {
            "products.$.quantity": quantity,
          },
        }
      );
    } else {
      const newProduct = { quantity, product: productId };
      await CartModel.findOneAndUpdate(
        {
          _id: cart._id,
        },
        {
          $push: { products: newProduct },
        }
      );
    }

    res.status(201).send({ message: "Product Added to Cart" });

    // update the quantity of that item in the cart
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "something went wrong" });
  }
});

const RemoveProduct = Authenticated(async (req, res) => {
  const { productId } = req.body;
  try {
    const product = await CartModel.findOneAndUpdate(
      { user: req.user_id },
      {
        $pull: { products: { product: productId } },
      },
      {
        new: true,
      }
    ).populate("products.product");
    res.status(200).json({ message: "product removed from cart" },product.products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "something went wrong" });
  }
});
