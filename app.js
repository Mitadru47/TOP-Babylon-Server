const express = require("express");
const app = express();

// Loading .env file contents into process.env
require("dotenv").config();

// MongoDB Connection

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

async function connectCluster(){
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
}

connectCluster()
    .catch((error) => console.log(error));

// Routing

const cors = require("cors"); // Enabled All CORS Requests
app.use(cors());

const indexRouter = require("./routes/index");
app.use("/", indexRouter);

module.exports = app;