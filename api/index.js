import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import { statusHandler } from "./middleware/status.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_CONNECT).then(() => {
    console.log("MONGODB IS CONNECTED 🔗 ");
});

const port = process.env.PORT || 3333;

app.listen(port, () => {
    console.log(`SERVER'S LAUNCHED 🚀 ON PORT :: ${port}`);
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

app.use(statusHandler);
