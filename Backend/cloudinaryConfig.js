// cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dk0tcl8m4',  // Replace with your Cloudinary cloud name
  api_key: '196976618432377',       // Replace with your Cloudinary API key
  api_secret: 'jE1zOqgmXr2S84EybT3BAq5XViM'  // Replace with your Cloudinary API secret
});

module.exports = cloudinary;
