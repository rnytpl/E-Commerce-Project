import express from "express";
import { dbConnect } from "./database/db.js";
import userRoutes from "./Routes/userRoutes.js";
import authRoutes from "./Routes/auth.js";
import productRoutes from "./Routes/productRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";
import stripeRoutes from "./Routes/stripeRoutes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

dbConnect();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/stripe", stripeRoutes);

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
