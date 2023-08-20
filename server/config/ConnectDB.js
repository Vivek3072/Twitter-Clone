// Mongoose is an object model design schema which helps us to connect to our mongoDB database
const mongoose = require("mongoose");
var colors = require("colors");
const dotenv = require("dotenv").config();

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Database connected:- ".blue + "✔".green);
    console.log("Database name : ".blue, connect.connection.name);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
