const express = require('express');
const router = express.Router();
const {
    registerAdmin,
    loginAdmin,
    getAdminDashboardStats
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/stats', protect, adminOnly, getAdminDashboardStats);

module.exports = router;
