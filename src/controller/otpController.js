const otpModel = require("../model/otpModel");
const twilio = require("twilio");
require("dotenv").config()


module.exports = class OtpController {
    constructor() {
        this.client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    }

    sendOtp = async (req, res) => {
        try {
            const { phone_no } = req.body;
            const otp = Math.floor(100000 + Math.random() * 900000);

            this.client.messages
                .create({
                    body: `Your OTP is ${otp}`,
                    from: process.env.TWILIO_PHONE_NO,
                    to: phone_no
                })
                .then(async () => {
                    const saveOtp = await otpModel.findOneAndUpdate({ user_phone: phone_no }, { otp: otp }, { upsert: true, new: true })
                    return res.status(200).send({ status: true, message: "OTP send successfully." })
                })
                .catch((err) => {
                    console.log(err);
                })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ status: false, message: "Something went wrong." })
        }
    }

    verifyOtp = async (req, res) => {
        try {
            const { phone_no, otp } = req.body;
            const isOtpMatched = await otpModel.findOne({ user_phone: phone_no, otp: otp })
            if (isOtpMatched) {
                const diffInMiliseconds = new Date().getTime() - isOtpMatched.updatedAt.getTime();
                const diffInMinutes = Math.floor((diffInMiliseconds / 1000) / 60);

                if (diffInMinutes >= 5) {
                    return res.status(400).send({ status: false, message: "OTP expired." })
                }
                return res.status(200).send({ status: true, message: "OTP verified successfully." })
            } else {
                return res.status(400).send({ status: false, message: "Invalid OTP!" })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send({ status: false, message: "Something went wrong!" })
        }
    }

}