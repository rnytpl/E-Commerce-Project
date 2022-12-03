import express from "express";
import { verifyTokenAdmin, verifyTokenAndAuthorize } from "./verifyToken.js";
import { User } from "../models/User.js";
import CryptoJS from "crypto-js";
const router = express.Router();

// UPDATE A USER
router.put("/:id", verifyTokenAndAuthorize, async (req, res) => {
  const { username, password } = req.body;
  const encryptedPassword = await CryptoJS.AES.encrypt(
    password,
    process.env.CRYPTJS_SECRET_PASSPHRASE
  ).toString();

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { username, password: encryptedPassword } },
      { new: true }
    );
    const { password, ...others } = updatedUser._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE A USER
router.delete("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete();
    res.status(200).json("User has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET USER
router.get("/find/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const findUser = await User.findById(req.params.id);
    const { password, ...others } = findUser._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL USERS

router.get("/getUsers", verifyTokenAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(3)
      : await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET USER STATS

router.get("/stats", verifyTokenAdmin, async (req, res) => {
  const thisYear = new Date();
  const lastYear = new Date(thisYear.setFullYear(thisYear.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      // Filters documents by looking at its createdAt field which is greater or equal to value of lastYear
      { $match: { createdAt: { $gte: lastYear } } },
      // $project only extracts month from createdAt field
      { $project: { month: { $month: "$createdAt" } } },
      { $group: { _id: "$month", total: { $sum: 1 } } },
    ]);
    res.status(200).json(data);
  } catch (error) {}
});

export default router;
