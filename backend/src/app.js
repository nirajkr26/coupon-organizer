const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser")

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");

app.use("/api/", authRouter)

connectDB().then(() => {
    console.log("db connected");
    app.listen(process.env.PORT, () => {
        console.log("server running on " + process.env.PORT);
    })
}).catch((err) => {
    console.error(err.message);
})