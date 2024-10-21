import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

dotenv.config();
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("🔗 CONNECTED TO MONGODB");
    })
    .catch((err) => console.error(err));

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3301;

app.listen(PORT, () => {
    console.log(`🚀 SERVER HAS LAUNCHED ON PORT :: ${PORT}`);
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
