const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: '+1 (555) 123-4567'
    },
    profileImage: {
        type: String,
        default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200&q=80'
    },
    savedPaymentMethod: {
        type: String,
        default: 'Visa •••• 4242 (Automatic)'
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
