const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const dbConnection = require("./utils/db");
const { errorHandler, routeNotFound } = require("./middleware/errorMiddleware");
const routes = require("./routes/index");

dotenv.config();
dbConnection();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:3001"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(morgan("dev"));
app.get("/", (req, res) => {
    res.send("server is running");
});

app.use("/api", routes);
app.use(routeNotFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
