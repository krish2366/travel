const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '.env') });

module.exports = {
    port: process.env.PORT,
    env: process.env.NODE_ENV,

    db: {
        uri: process.env.MONGODB_URI,
    },
    accessToken: {
        secret: process.env.JWT_SECRET,
        expiry: process.env.JWT_EXPIRY,
    },
    refreshToken: {
        secret: process.env.REFRESH_SECRET,
        expiry: process.env.REFRESH_EXPIRY,
    },
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
    },

    logDirectory: path.resolve(__dirname, '../logs'),
};