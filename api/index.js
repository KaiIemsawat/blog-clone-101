import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoute from "./routes/user.route.js";

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_CONNECT).then(() => {
    console.log("MONGODB IS CONNECTED 🔗 ");
});

const port = process.env.PORT || 3333;

app.listen(port, () => {
    console.log(`SERVER'S LAUNCHED 🚀 ON PORT :: ${port}`);
});

app.use("/api/user", userRoute);
