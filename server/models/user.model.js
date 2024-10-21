import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minLength: [3, "Username minimum length is 3 characters"],
            maxLength: [25, "Username maximum length is 25 characters"],
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minLength: [5, "Password minimum length is 5 characters"],
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
