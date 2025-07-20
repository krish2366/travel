const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '.env') });

module.exports = {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    frontendUrl: process.env.FRONTEND_URL,

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
    google:{
        client_id: process.env.GOOGLE_CLIENT_ID,
        secret: process.env.GOOGLE_SECRET
    },

    logDirectory: path.resolve(__dirname, '../logs'),
};