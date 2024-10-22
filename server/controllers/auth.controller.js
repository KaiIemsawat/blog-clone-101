import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

dotenv.config();

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || email === "") {
        return next(errorHandler(400, "All fields are required"));
    } else if (username.length < 3) {
        return next(
            errorHandler(400, "Username minimum length is 3 characters")
        );
    } else if (password.length < 5) {
        return next(
            errorHandler(400, "Password minimum length is 5 characters")
        );
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

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        next(errorHandler(400, "All fields are required"));
    }

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(400, "Invalid credentials"));
        }
        const validPassword = bcryptjs.compareSync(
            password,
            validUser.password
        );
        if (!validPassword) {
            return next(errorHandler(400, "Invalid credentials"));
        }

        const token = jwt.sign(
            {
                id: validUser._id,
            },
            process.env.JWT_SECRET
        );

        // Separate password from everything else
        const { password: pass, ...rest } = validUser._doc;

        res.status(200)
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .json(rest);
    } catch (error) {
        next(errorHandler(400, "Bad request"));
    }
};
