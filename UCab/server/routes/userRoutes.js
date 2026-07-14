const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    getAllUsers,
    deleteUser,
    uploadAvatar
} = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.route('/profile').get(protect, getProfile).put(protect, updateProfile);
router.post('/upload-avatar', protect, upload.single('avatar'), uploadAvatar);

// Admin user management routes
router.route('/').get(protect, adminOnly, getAllUsers);
router.route('/:id').put(protect, adminOnly, updateProfile).delete(protect, adminOnly, deleteUser);

module.exports = router;
