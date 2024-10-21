import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("🔗 CONNECTED TO MONGODB");
    })
    .catch((err) => console.error(err));
const app = express();

const PORT = process.env.PORT || 3301;

app.listen(PORT, () => {
    console.log(`🚀 SERVER HAS LAUNCHED ON PORT :: ${PORT}`);
});
