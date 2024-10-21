import bcryptjs from "bcryptjs";

import User from "../models/user.model.js";

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username);
    console.log(email);
    console.log(password);

    if (!username || !email || !password || email === "") {
        return res.status(400).json({ message: "All fields are required" });
    } else if (username.length < 3) {
        return res
            .status(400)
            .json({ message: "Username minimum length is 3 characters" });
    } else if (password.length < 5) {
        return res
            .status(400)
            .json({ message: "Password minimum length is 5 characters" });
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
        console.error(error.message);
    }
};
