const express = require("express");
const otpRoute = require("./route/otpRoute");

const app = express();

app.use("/otp", otpRoute)


module.exports = app;