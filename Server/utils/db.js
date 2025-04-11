var mongoose = require("mongoose");

require("dotenv").config();

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database is Connected");
    } catch (error) {
        console.log("Database error" + error);
    }
};
module.exports = dbConnection;
