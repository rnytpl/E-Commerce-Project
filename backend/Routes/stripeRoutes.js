import express from "express";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51LuuM8BXN4JKY9XlOYRzuqFBizFZJB6xE7T2g7XjdIyYds5NWoudURTjW8RlQH7qXetmnTCTFWHKGYV31JdQIBgN00syxQKy8G"
);
const route = express.Router();

route.get("/config", (req, res) => {
  res.send({ publishableKey: process.env.STRIPE_PK });
});

route.post("/create-payment-intent", async (req, res) => {
  const amount = req.body.amount;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: amount.toFixed() * 100,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json(error);
  }
});
export default route;
