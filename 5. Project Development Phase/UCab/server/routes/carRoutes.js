const express = require('express');
const router = express.Router();
const {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
} = require('../controllers/carController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');

router.route('/')
    .get(getAllCars)
    .post(protect, adminOnly, upload.single('image'), createCar);

router.route('/:id')
    .get(getCarById)
    .put(protect, adminOnly, upload.single('image'), updateCar)
    .delete(protect, adminOnly, deleteCar);

module.exports = router;
