const express = require('express');
const router = express.Router();
const { createBooking, markAsPaid , getAllBookings , getMyBookingById } = require('../controllers/bookingController.js');
const { isUser } = require('../middlewares/authMiddleware.js')


router.post('/book',isUser,createBooking);
router.patch('/mark-as-paid', isUser, markAsPaid);
router.get('/:id', isUser, getMyBookingById);
router.get('/all', isUser, getAllBookings);

module.exports = router;