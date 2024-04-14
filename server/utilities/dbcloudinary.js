const dbcloudinary = require("cloudinary").v2;

dbcloudinary.config({
    cloud_name: process.env.VITE_CLOUD_NAME,
    api_key: process.env.VITE_CLOUD_KEY,
    api_secret: process.env.VITE_CLOUD_KEY_SECRET
});

module.exports = dbcloudinary;