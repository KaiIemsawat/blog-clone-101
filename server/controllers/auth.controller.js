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
    } else if (username.length < 3 || username.length > 25) {
        return next(
            errorHandler(400, "Username must be between 3 to 25 characters")
        );
    } else if (username.includes(" ")) {
        return next(errorHandler(400, "Username cannot contain space"));
    } else if (!username.match(/^[a-zA-Z0-9]+$/)) {
        return next(
            errorHandler(400, "Username can only contain laters and numbers")
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
        // res.json("Successfully signup");

        const validUser = await User.findOne({ email });
        if (!validUser) {
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
                isAdmin: validUser.isAdmin,
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

export const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign(
                { id: user._id, isAdmin: user.isAdmin },
                process.env.JWT_SECRET
            );
            const { password, ...rest } = user._doc;
            res.status(200)
                .cookie("access_token", token, {
                    httpOnly: true,
                })
                .json(rest);
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username:
                    name.toLowerCase().replace(" ", "") +
                    Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });

            await newUser.save();
            const token = jwt.sign(
                { id: newUser._id, isAdmin: newUser.isAdmin },
                process.JWT_SECRET
            );
            const { password, ...rest } = user._doc;
            res.status(201)
                .cookie("access_token", token, {
                    httpOnly: true,
                })
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};
