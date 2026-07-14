const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    pickupLocation: {
        type: String,
        required: true
    },
    dropLocation: {
        type: String,
        required: true
    },
    bookingDate: {
        type: String,
        required: true
    },
    distanceKm: {
        type: Number,
        required: true
    },
    totalFare: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Started', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    paymentMethod: {
        type: String,
        default: 'Automatic Saved Card (Visa •••• 4242)'
    },
    refreshmentsOrdered: {
        type: Boolean,
        default: false
    },
    refreshmentCost: {
        type: Number,
        default: 0
    },
    donationMade: {
        type: Boolean,
        default: false
    },
    donationAmount: {
        type: Number,
        default: 0
    },
    discountCode: {
        type: String,
        default: ''
    },
    discountAmount: {
        type: Number,
        default: 0
    },
    estimatedTimeMinutes: {
        type: Number,
        default: 15
    },
    driverAssigned: {
        name: { type: String, default: 'Vikram Sharma' },
        phone: { type: String, default: '+91 98765 43210' },
        rating: { type: Number, default: 4.8 }
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
