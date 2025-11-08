const express = require("express");
const userAuth = require("../middlewares/authentication");


const router = express.Router();

router.get("/coupon", userAuth, async (req, res) => {
    console.log(req.user);
    res.send("success")
})

module.exports = router