import mongoose from "mongoose";
import { Product } from "../models/Product.js";
import { products } from "./data.js";
import dotenv from "dotenv";

dotenv.config();

export const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DB connection successfull"))
    .catch((e) => console.log(e));
};
dbConnect();

const dataImport = async (req, res) => {
  await Product.deleteMany({});

  try {
    await Product.insertMany(products);
    console.log("Data imported");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const dataDestroy = async (req, res) => {
  try {
    await Product.deleteMany({});
    console.log("Data destroyed");
  } catch (error) {}
};

if (process.argv[2] === "-d") {
  dataDestroy();
} else {
  dataImport();
}
