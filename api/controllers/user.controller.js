export const test = (req, res) => {
    res.json({ message: "API testing" });
};

export const updateUser = async (req, res, next) => {
    console.log(req.user);
};
