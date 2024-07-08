const express = require("express");
let OtpController = require("../controller/otpController");
let otpController = new OtpController();


const router = express.Router();

router.route("/send-otp").post(otpController.sendOtp)
router.route("/verify-otp").post(otpController.verifyOtp)


module.exports = router;