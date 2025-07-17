const express = require("express");
const { register , login , logout, getUser} = require('../controllers/userController');
const { isUser } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/", isUser, getUser);

module.exports = router;
