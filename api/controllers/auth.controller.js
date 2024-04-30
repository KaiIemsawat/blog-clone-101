import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (
        !username ||
        !email ||
        !password ||
        username === "" ||
        email === "" ||
        password === ""
    ) {
        next(errorHandler(400, "All fields are required"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.json({ message: "Signup successful!" });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === "" || password === "") {
        next(errorHandler(400, "All fields are required"));
    }

    try {
        // Check user existance
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(400, "Invalid Credentials"));
        }

        // matching passwords
        const validPassword = bcryptjs.compareSync(
            password,
            validUser.password
        );
        if (!validPassword) {
            return next(errorHandler(400, "Invalid Credentials"));
        }

        const token = jwt.sign(
            { id: validUser._id },
            process.env.JWT_SECRET_KEY
        );

        // Separate password from the other. Then, retufrn 'rest'
        const { password: pw, ...rest } = validUser._doc;

        res.status(200)
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .json(rest); // Use 'rest' instead of all info that include password
    } catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET_KEY
            );
            const { password, ...rest } = user._doc;

            res.status(200)
                .cookie("access_token", token, {
                    httpOnly: true,
                })
                .json(rest);
        } else {
            // Create a random password. since password is required
            // Can be changed later
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            // Hashed the random password
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                // Create a name using first and lastname,
                // attach them and add random number
                username:
                    name.toLowerCase().split(" ").join("") +
                    Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });
            await newUser.save();
            const token = jwt.sign(
                { id: newUser._id },
                process.env.JWT_SECRET_KEY
            );
            const { password, ...rest } = newUser._doc;
            res.status(200)
                .cookie("access_token", token, {
                    httpOnly: true,
                })
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};
