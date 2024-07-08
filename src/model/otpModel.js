const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    user_phone: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("otp", otpSchema);