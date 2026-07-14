const Booking = require('../models/Booking');
const Car = require('../models/Car');
const { loadData, saveData } = require('../db/store');

exports.createBooking = async (req, res) => {
    try {
        const { carId, pickupLocation, dropLocation, bookingDate, distanceKm, refreshmentsOrdered, donationMade, discountCode, paymentMethod } = req.body;

        if (global.isMongoConnected) {
            const car = await Car.findById(carId);
            if (!car) return res.status(404).json({ message: 'Car not found' });

            const baseFare = car.baseFare || 50;
            const pricePerKm = car.pricePerKm || 12;
            const distanceCost = distanceKm * pricePerKm;
            const rawFare = baseFare + distanceCost;
            const refreshmentCost = refreshmentsOrdered ? 50 : 0;
            const donationCost = donationMade ? 20 : 0;

            let discountAmount = 0;
            if (discountCode && discountCode.toUpperCase() === 'UCAB20') {
                discountAmount = Math.round(rawFare * 0.20);
            } else if (discountCode && discountCode.toUpperCase() === 'WELCOME10') {
                discountAmount = Math.round(rawFare * 0.10);
            }

            const totalFare = Math.max(10, Math.round(rawFare + refreshmentCost + donationCost - discountAmount));
            const estimatedTimeMinutes = Math.max(10, Math.round(distanceKm * 2.5));

            const drivers = [
                { name: 'Vikram Sharma', phone: '+91 98111 22334', rating: 4.9 },
                { name: 'Rajesh Kumar', phone: '+91 98222 33445', rating: 4.8 },
                { name: 'Amit Verma', phone: '+91 98333 44556', rating: 4.7 },
                { name: 'Sanjay Singh', phone: '+91 98444 55667', rating: 4.9 }
            ];
            const driverAssigned = drivers[Math.floor(Math.random() * drivers.length)];

            const newBooking = await Booking.create({
                user: req.user._id,
                car: carId,
                pickupLocation,
                dropLocation,
                bookingDate,
                distanceKm,
                totalFare,
                status: 'Started',
                refreshmentsOrdered,
                donationMade,
                discountCode,
                discountAmount,
                paymentMethod,
                estimatedTimeMinutes,
                driverAssigned
            });

            return res.status(201).json(newBooking);
        } else {
            const store = loadData();
            const car = (store.cars || []).find(c => c._id === carId);
            if (!car) return res.status(404).json({ message: 'Car not found' });

            const baseFare = car.baseFare || 50;
            const pricePerKm = car.pricePerKm || 12;
            const distanceCost = distanceKm * pricePerKm;
            const rawFare = baseFare + distanceCost;
            const refreshmentCost = refreshmentsOrdered ? 50 : 0;
            const donationCost = donationMade ? 20 : 0;

            let discountAmount = 0;
            if (discountCode && discountCode.toUpperCase() === 'UCAB20') {
                discountAmount = Math.round(rawFare * 0.20);
            } else if (discountCode && discountCode.toUpperCase() === 'WELCOME10') {
                discountAmount = Math.round(rawFare * 0.10);
            }

            const totalFare = Math.max(10, Math.round(rawFare + refreshmentCost + donationCost - discountAmount));
            const estimatedTimeMinutes = Math.max(10, Math.round(distanceKm * 2.5));

            const drivers = [
                { name: 'Vikram Sharma', phone: '+91 98111 22334', rating: 4.9 },
                { name: 'Rajesh Kumar', phone: '+91 98222 33445', rating: 4.8 },
                { name: 'Amit Verma', phone: '+91 98333 44556', rating: 4.7 },
                { name: 'Sanjay Singh', phone: '+91 98444 55667', rating: 4.9 }
            ];
            const driverAssigned = drivers[Math.floor(Math.random() * drivers.length)];

            const newBooking = {
                _id: 'booking_' + Date.now(),
                user: req.user._id,
                car: car._id,
                pickupLocation,
                dropLocation,
                bookingDate,
                distanceKm,
                totalFare,
                status: 'Started',
                refreshmentsOrdered,
                donationMade,
                discountCode,
                discountAmount,
                paymentMethod: paymentMethod || 'Automatic Saved Card (Visa •••• 4242)',
                estimatedTimeMinutes,
                driverAssigned,
                createdAt: new Date().toISOString()
            };

            store.bookings = [newBooking, ...(store.bookings || [])];
            saveData(store);

            return res.status(201).json(newBooking);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        if (global.isMongoConnected) {
            const bookings = await Booking.find({ user: req.user._id }).populate('car').sort({ createdAt: -1 });
            return res.status(200).json(bookings);
        } else {
            const store = loadData();
            const bookings = (store.bookings || [])
                .filter(b => b.user === req.user._id)
                .map(b => ({
                    ...b,
                    car: (store.cars || []).find(c => c._id === b.car) || null
                }))
                .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

            return res.status(200).json(bookings);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllBookingsAdmin = async (req, res) => {
    try {
        if (global.isMongoConnected) {
            const bookings = await Booking.find({}).populate('user', '-password').populate('car').sort({ createdAt: -1 });
            return res.status(200).json(bookings);
        } else {
            const store = loadData();
            const bookings = (store.bookings || []).map(b => ({
                ...b,
                user: (store.users || []).find(u => u._id === b.user) || { name: 'User', email: 'user@ucab.com' },
                car: (store.cars || []).find(c => c._id === b.car) || null
            })).sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

            return res.status(200).json(bookings);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (global.isMongoConnected) {
            const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
            if (!booking) return res.status(404).json({ message: 'Booking not found' });
            return res.status(200).json(booking);
        } else {
            const store = loadData();
            const index = (store.bookings || []).findIndex(b => b._id === req.params.id);
            if (index === -1) return res.status(404).json({ message: 'Booking not found' });

            store.bookings[index].status = status;
            saveData(store);

            return res.status(200).json(store.bookings[index]);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
