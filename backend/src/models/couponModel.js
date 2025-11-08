const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true,
        trim: true,
        min: 2
    },
    code: {
        type: String,
        required: true,
        min: 2,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    discount: {
        type: Number,

    },
    expiryDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon