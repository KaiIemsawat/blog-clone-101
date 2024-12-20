import bcryptjs from "bcryptjs";

import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";

export const test = (req, res) => {
    res.json({ message: "API TEST" });
};

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, "Forbidden"));
    }
    if (req.body.password) {
        if (req.body.password < 6) {
            return next(
                errorHandler(400, "Password must be at least 6 charactors")
            );
        }
        req.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if (req.body.username) {
        if (req.body.username.length < 3 || req.body.username.length > 25) {
            return next(
                errorHandler(400, "Username must be between 3 to 25 characters")
            );
        }
        if (req.body.username.includes(" ")) {
            return next(errorHandler(400, "Username cannot contain space"));
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(
                errorHandler(
                    400,
                    "Username can only contain laters and numbers"
                )
            );
        }
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    password: req.body.password,
                },
            },
            { new: true }
        );
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, "Unauthorized to delete this account"));
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json("Account has been successfully deleted");
    } catch (error) {
        next(error);
    }
};

export const signout = (req, res, next) => {
    try {
        res.clearCookie("access_token")
            .status(200)
            .json("Successfully signed out");
    } catch (error) {
        next(error);
    }
};
