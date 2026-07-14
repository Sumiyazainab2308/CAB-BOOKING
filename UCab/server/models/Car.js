const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    cabType: {
        type: String,
        required: true,
        enum: ['Mini', 'Sedan', 'SUV', 'Luxury']
    },
    baseFare: {
        type: Number,
        required: true,
        default: 50
    },
    pricePerKm: {
        type: Number,
        required: true,
        default: 12
    },
    seats: {
        type: Number,
        required: true,
        default: 4
    },
    plateNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        default: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80'
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Car', CarSchema);
