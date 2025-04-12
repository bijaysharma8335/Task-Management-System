const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { createJWT } = require("../utils");
const Notification = require("../models/notification");

const registerUser = async (req, res) => {
    try {
        const { name, email, password, isAdmin, role, title } = req.body;
        const userExist = User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ status: false, message: "User already exists" });
        }
        const user = await User.create({ name, email, password, isAdmin, role, title });

        if (user) {
            isAdmin ? createJWT(res, user._id) : null;

            user.password = undefined;
            res.status(201).json(user);
        } else {
            return res.status(400).json({ status: false, message: "Invalid user data" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

const loginUser = async () => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(401).json({ status: false, message: "Invalid email or password" });
        }
        if (!user.isActive) {
            res.status(401).json({
                status: false,
                message: "User account has been deactivated , contact the administrator",
            });
        }
        const isMatch = await User.matchPassword(password);
        if (user & isMatch) {
            createJWT(res, user._id);
            user.password = undefined;
            res.status(200).json(user);
        } else {
            return res.status(401).json({ status: false, message: "Invalid email or password" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};
const logoutUser = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });
        res.status(200).json({ message: "Logout Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

const getTeamList = async (req, res) => {
    try {
        const users = await User.find().select("name email role title");
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};
const getNotificationsList = async (req, res) => {
    try {
        const { userId } = req.user;
        const notifications = await Notification.find({ team: userId, isRead: { $nin: [userId] } }).populate("task","title");
        res.status(200).json(notifications);
    } catch (error) {
        console.log(error);
        return res.status(400).json({status:false,message:error.message});
    }
};
module.exports = { registerUser, loginUser, logoutUser };
