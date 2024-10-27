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
        profilePicture: {
            type: String,
            default:
                "https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg",
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
