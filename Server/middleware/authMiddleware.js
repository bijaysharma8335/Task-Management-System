const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protectedRoute = async (req, res, next) => {
    try {
        let token = req.cookiies?.token;
        if (token) {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const response = await User.findById(decodedToken.userId).select("isAdmin email");

            req.user = {
                email: response.email,
                isADmin: response.isAdmin,
                userId: decodedToken.userID,
            };
            next();
        } else {
            return res.status(401).json({ status: false, message: "Not authorized. Try again" });
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({ status: false, message: "Not authorized. Try again" });
    }
};

const isAdminRoute = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return res
            .status(401)
            .json({ status: false, message: "Not authorized as admin. Try login as admin." });
    }
};

module.exports = { isAdminRoute, protectedRoute };
