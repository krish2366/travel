const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

exports.isUser = async(req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: 'Invalid token format' });
    }

    try {
        const decoded = jwt.verify(token, config.accessToken.secret);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        const user = await User.findById(decoded.id);
        req.user = user;
        next();
    } catch (err) {
        console.error(err.message);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
