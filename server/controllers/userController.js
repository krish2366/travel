const bcrypt = require('bcryptjs');
const User = require('../models/User'); 
const config = require('../config/config');
const ms = require('ms');

exports.register = async (req, res) => {
    const { name, email , password } = req.body;

    try {
        const user = await User.findOne({ email });
        
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const accessToken = newUser.getJWTToken(config.accessToken.expiry, config.accessToken.secret);
        const refreshToken = newUser.getJWTToken(config.refreshToken.expiry, config.refreshToken.secret);

        const options = {
            httpOnly: true,
            expires: new Date(Date.now() + ms(config.refreshToken.expiry)),
            secure: config.env === 'production'
        };
        return res
            .status(201)
            .cookie('refreshToken', refreshToken, options)
            .json({accessToken, user:newUser})
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const accessToken = user.getJWTToken(config.accessToken.expiry, config.accessToken.secret);
        const refreshToken = user.getJWTToken(config.refreshToken.expiry, config.refreshToken.secret);
        const options = {
            httpOnly: true,
            expires: new Date(Date.now() + ms(config.refreshToken.expiry)),
            secure: config.env === 'production'
        };

        return res
            .status(200)
            .cookie('refreshToken', refreshToken, options)
            .json({ accessToken, user });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.logout = (req, res) => {
    return res
        .clearCookie('refreshToken', {
            httpOnly: true,
            secure: config.env === 'production'
        })
        .status(200)
        .json({ message: 'User logged out successfully' });
};

exports.getUser = async (req, res) => {
    try {
        const id = req.user._id;

        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}