import express, { Router } from "express";
import { Product } from "../models/Product.js";
import { verifyTokenAdmin } from "./verifyToken.js";
const router = express.Router();

// router.get("/usertest", (req, res) => {
//   res.send("User test");
// });

// CREATE PRODUCT

router.post("/", verifyTokenAdmin, async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(400).json(error);
  }
});

// UPDATE PRODUCT

router.put("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const updateProduct = await Product.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: req.body,
      },
      { new: true }
    );
    updateProduct.save();
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE PRODUCT

router.delete("/:id", verifyTokenAdmin, async (req, res) => {
  console.log(req.params);
  try {
    await Product.findByIdAndDelete({
      _id: req.params.id,
    });
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET PRODUCT

router.get("/find/:id", async (req, res) => {
  try {
    const findProduct = await Product.findById(req.params.id);
    res.status(200).json(findProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      console.log(qCategory);
      products = await Product.find({ categories: { $in: [qCategory] } });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});
export default router;
