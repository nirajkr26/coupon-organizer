const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser")

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("hello")
})

connectDB().then(() => {
    console.log("db connected");
    app.listen(process.env.PORT, () => {
        console.log("server running on " + process.env.PORT);
    })
}).catch((err) => {
    console.error(err.message);
})