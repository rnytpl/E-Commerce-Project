import express from "express";
import { Order } from "../models/Order.js";
import { User } from "../models/User.js";
import {
  verifyToken,
  verifyTokenAdmin,
  verifyTokenAndAuthorize,
} from "./verifyToken.js";
const router = express.Router();

// CREATE ORDER

router.post("/", verifyToken, async (req, res) => {
  console.log("orderRoutes");
  const user = req.user;

  const { products, amount, adress } = req.body;
  const findUser = await User.findById(user.id);
  console.log(findUser);
  try {
    const newOrder = await Order.create({
      userId: user.id,
      products,
      amount,
      adress,
    });
    await findUser.orders.push(newOrder);
    await findUser.save();
    res.status(200).json(newOrder);
  } catch (error) {
    res.status(400).json(error);
  }
});

// UPDATE ORDER

router.put("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const updateOrder = await Order.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: req.body,
      },
      { new: true }
    );
    updateOrder.save();
    res.status(200).json(updateOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE ORDER

router.delete("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).json("Order deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET USER ORDER

router.get("/find/:userId", verifyTokenAndAuthorize, async (req, res) => {
  try {
    const findOrder = await Order.find({ userId: req.params.userId }).populate(
      "userId"
    );
    res.status(200).json(findOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ORDERS

router.get("/getOrders", verifyTokenAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(err);
  }
});

// GET MONTHLY INCOME

router.get("/income", verifyTokenAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },
      { $group: { _id: "$month", total: { $sum: "$sales" } } },
    ]);

    res.status(200).json(income);
  } catch (error) {}
});

export default router;
