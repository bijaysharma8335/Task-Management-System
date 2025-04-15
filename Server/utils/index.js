var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");

require("dotenv").config();

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database is Connected");
    } catch (error) {
        console.log("Database error" + error);
    }
};

const createJWT = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
    // console.log(token);
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "none",
        maxAge: 1 * 24 * 60 * 60 * 1000,
    });
    // console.log(res);
};

module.exports = { dbConnection, createJWT };
