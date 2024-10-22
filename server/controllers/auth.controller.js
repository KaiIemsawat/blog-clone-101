import bcryptjs from "bcryptjs";

import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || email === "") {
        next(errorHandler(400, "All fields are required"));
    } else if (username.length < 3) {
        next(errorHandler(400, "Username minimum length is 3 characters"));
    } else if (password.length < 5) {
        next(errorHandler(400, "Password minimum length is 5 characters"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    try {
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.json("Successfully signup");
    } catch (error) {
        next(errorHandler(400, "Invalid credentials"));
    }
};
