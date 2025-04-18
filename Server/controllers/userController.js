const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { createJWT } = require("../utils");
const Notification = require("../models/notification");

const registerUser = async (req, res) => {
    try {
        const { email, name, password, isAdmin, role, title } = req.body;

        const userExist = await User.findOne({ email });
        // console.log(userExist, "userexist");
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

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log(req.body);
        const user = await User.findOne({ email });
        // console.log(user);

        if (!user) {
            res.status(401).json({ status: false, message: "Invalid email or password" });
        }

        if (!user?.isActive) {
            res.status(401).json({
                status: false,
                message: "User account has been deactivated , contact the administrator",
            });
        }

        const isMatch = await user.matchPassword(password);

        if (user && isMatch) {
            // console.log(user + "------------" + isMatch);
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
        const users = await User.find().select("name email role title isActive");
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};
const getNotificationsList = async (req, res) => {
    try {
        const { userId } = req.user;
        const notifications = await Notification.find({
            team: userId,
            isRead: { $nin: [userId] },
        }).populate("task", "title");
        res.status(200).json(notifications);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};
const updateUserProfile = async (req, res) => {
    try {
        const { userId, isAdmin } = req.user;
        const { _id } = req.body;

        const id = isAdmin && userId === _id ? userId : isAdmin && userId !== _id ? _id : userId;

        const user = await User.findById(id);

        if (user) {
            user.name = req.body.name || user.name;
            user.title = req.body.title || user.title;
            user.role = req.body.role || user.role;

            const updatedUser = await user.save();

            user.password = undefined;

            res.status(201).json({
                status: true,
                message: "Profile Updated Successfully.",
                user: updatedUser,
            });
        } else {
            res.status(404).json({ status: false, message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

const markNotificationRead = async (req, res) => {
    try {
        const { userId } = req.user;

        const { isReadType, id } = req.query;
        if (isReadType === "all") {
            await Notification.updateMany(
                { team: userId, isRead: { $nin: [userId] } },
                { $push: { isRead: userId } },
                { new: true }
            );
        } else {
            await Notification.findOneAndUpdate(
                { _id: id, isRead: { $nin: [userId] } },
                { $push: { isRead: userId } },
                { new: true }
            );
        }

        res.status(201).json({ status: true, message: "Done" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};
const changeUserPassword = async (req, res) => {
    try {
        const { userId } = req.user;
        const user = await User.findById(userId);
        if (user) {
            user.password = req.body.password;
            await user.save();

            user.password = undefined;
            res.status(201).json({ status: false, message: "User not found" });
        } else {
            res.status(404).json({ status: false, message: error.message });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};
const activateUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (user) {
            user.isActive = req.body.isActive;
            await user.save();

            res.status(201).json({
                status: true,
                message: `User account has been ${user?.isActive ? "activated" : "disabled"}`,
            });
        } else {
            res.status(404).json({ status: false, message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};
const deleteUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);

        res.status(200).json({ status: true, message: "User deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    deleteUserProfile,
    activateUserProfile,
    changeUserPassword,
    getNotificationsList,
    markNotificationRead,
    updateUserProfile,
    getTeamList,
};
