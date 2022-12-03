import express from "express";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
const router = express.Router();

// REGISTER
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      res.status(400).send("User already exists");
    }

    const newUser = await User.create({
      username,
      email,
      password,
    });
    res.json(newUser);
  })
);

// LOGIN
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    // Receive username and password
    // Find it in database
    // If user exists create an access token using JWT
    // Match existing user's password with the password received from the person who tries to sign in

    const { username } = req.body;
    const pass = req.body.password;
    const findUser = await User.findOne({ username });

    if (!findUser) {
      // res.status(401);
      // throw new Error("User does not exist");
      res.status(401).send("User does not exist");
    }

    const accessToken = jwt.sign(
      {
        id: findUser._id,
        isAdmin: findUser.isAdmin,
      },
      process.env.JWT_SECRETKEY,
      { expiresIn: "3d" }
    );
    if (await findUser.matchPassword(pass)) {
      const { password, ...others } = findUser._doc;
      res.status(200).json({ ...others, accessToken });
    } else {
      res.status(401).send("Wrong credentials");
    }
  })
);

export default router;
