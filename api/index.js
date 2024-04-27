import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_CONNECT).then(() => {
    console.log("MONGODB IS CONNECTED 🔗 ");
});

const port = process.env.PORT || 3333;

app.listen(port, () => {
    console.log(`SERVER'S LAUNCHED 🚀 ON PORT :: ${port}`);
});

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
