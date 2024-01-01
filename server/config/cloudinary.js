require("dotenv").config()
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  CLOUDINARY_URL: process.env.CLOUDINARY_URL,
  secure: true,
});

// console.log("CLOUDINARY SDK CREDENTIALS");
// console.log(cloudinary.config().cloud_name);
// console.log(cloudinary.config().api_key);

module.exports = cloudinary;
