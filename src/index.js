const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const ConnectDB = require("./config/dbConfig");
const indexRouting = require("./index_routing");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use("/v1", indexRouting)

ConnectDB();
app.listen(PORT, console.log(`Server running on port ${PORT}`))
