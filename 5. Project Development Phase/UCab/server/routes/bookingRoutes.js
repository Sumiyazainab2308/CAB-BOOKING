const express = require('express');
const router = express.Router();
const {
    createBooking,
    getUserBookings,
    getAllBookingsAdmin,
    updateBookingStatus
} = require('../controllers/bookingController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, createBooking);

router.get('/user', protect, getUserBookings);
router.get('/admin', protect, adminOnly, getAllBookingsAdmin);

router.route('/:id')
    .put(protect, updateBookingStatus);

module.exports = router;
