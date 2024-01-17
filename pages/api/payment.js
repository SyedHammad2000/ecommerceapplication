// Stripe Payment
import Stripe from "stripe";
import { v4 as uuidV4 } from "uuid";
import jwt from "jsonwebtoken";
import CartModel from "@/Schema/CartSchema";
const STRIPE_KEY =
  "sk_test_51OQpi9Kh7tyffymbSoi3c5OwoPZ0KHOfCu1hUD7UEON4IpW1jMKEIx8FFsgozrB8cgrCnteJM9sJRkWowTvbGlMU00wz8s2DLx";
const JWT_SECRET = "adsadsadas";

const stripe = Stripe(STRIPE_KEY);
export default async function handler(req, res) {
  const { paymentInfo } = req.body;
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "you must logged in" });
  }

  try {
    const { user_id } = jwt.verify(authorization, JWT_SECRET);
    const cart = await CartModel.findOne({ user: user_id }).populate(
      "products.product"
    );
    let price = 0;
    cart.products.forEach((item) => {
      price = price + item.quantity * item.product.price;
    });
    const prevCustomer = await stripe.customers.list({
      email: paymentInfo.email,
    });
    const isExistingCustomer = prevCustomer.data.length > 0;
    let newCustomer;
    if (!isExistingCustomer) {
      newCustomer = await stripe.customers.create({
        email: paymentInfo.email,
        source: paymentInfo.id,
      });
    }

    await stripe.charges.create(
      {
        currency: "INR",
        amount: price * 100,
        receipt_email: paymentInfo.email,
        customer: isExistingCustomer ? prevCustomer.data[0].id : newCustomer.id,
        description: `you purchased a product | ${paymentInfo.email}`,
      },
      {
        idempotencyKey: uuidV4(),
      }
    );
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "something went wrong" });
  }
}
