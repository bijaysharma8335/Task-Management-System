const { default: User } = require("../models/user");


const registerUser = async (req, res) => {
    try {
        const { name, email, password, isAdmin, role, title } = req.body;
        const userExist = User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ status: false, message: "User already exists" });
        }
    } catch (error) {}
};
module.exports = { registerUser };
