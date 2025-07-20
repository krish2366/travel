const express = require("express");
const passport = require('passport');
const config = require('../config/config');
const { register , login , logout, getUser, handleGoogleCallback} = require('../controllers/userController');
const { isUser } = require("../middlewares/authMiddleware")
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/", isUser, getUser);

// google OAuth routes
router.get('/google', passport.authenticate('google',{
    scope: ['profile','email']
}))

router.get('/google/callback', passport.authenticate('google',{
    failureRedirect: `${config.frontendUrl}/login?error=Oauth`
}),
    handleGoogleCallback
);

module.exports = router;
