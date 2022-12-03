import express, { Router } from "express";
import { Cart } from "../models/Product.js";
import {
  verifyToken,
  verifyTokenAdmin,
  verifyTokenAndAuthorize,
} from "./verifyToken.js";
const router = express.Router();

// router.get("/usertest", (req, res) => {
//   res.send("User test");
// });

// CREATE PRODUCT

router.post("/", verifyToken, async (req, res) => {
  try {
    const newCart = await Cart.create(req.body);
    res.status(200).json(newCart);
  } catch (error) {
    res.status(400).json(error);
  }
});

// UPDATE CART

router.put("/:id", verifyTokenAndAuthorize, async (req, res) => {
  try {
    const updateCart = await Cart.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: req.body,
      },
      { new: true }
    );
    updateCart.save();
    res.status(200).json(updateCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE CART

router.delete("/:id", verifyTokenAndAuthorize, async (req, res) => {
  try {
    await Cart.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).json("Cart deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET USER CART

router.get("/find/:userId", verifyTokenAndAuthorize, async (req, res) => {
  try {
    const findCart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(findCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL PRODUCTS

router.get("/", verifyTokenAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(err);
  }
});
export default router;
