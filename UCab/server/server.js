require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./db/config');
const Car = require('./models/Car');
const { loadData, saveData } = require('./db/store');

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const carRoutes = require('./routes/carRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/bookings', bookingRoutes);

// Base route check
app.get('/', (req, res) => {
    res.json({
        message: 'UCab MERN Cab Booking API is Running 🚀',
        version: '1.0.0',
        mode: global.isMongoConnected ? 'Real MongoDB Engine' : 'Automatic Zero-Config JSON Fallback Engine',
        endpoints: {
            users: '/api/users',
            admin: '/api/admin',
            cars: '/api/cars',
            bookings: '/api/bookings'
        }
    });
});

// Automatically seed cars on startup if none exist
const autoSeedCars = async () => {
    try {
        if (global.isMongoConnected) {
            const count = await Car.countDocuments();
            if (count === 0) {
                console.log('Seeding initial cab inventory to MongoDB...');
                const sampleCars = [
                    {
                        name: 'Maruti Swift Dzire',
                        cabType: 'Sedan',
                        baseFare: 50,
                        pricePerKm: 12,
                        seats: 4,
                        plateNumber: 'DL 01 AB 1234',
                        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80',
                        isAvailable: true
                    },
                    {
                        name: 'Hyundai Grand i10',
                        cabType: 'Mini',
                        baseFare: 40,
                        pricePerKm: 10,
                        seats: 4,
                        plateNumber: 'KA 03 CD 5678',
                        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
                        isAvailable: true
                    },
                    {
                        name: 'Toyota Innova Crysta',
                        cabType: 'SUV',
                        baseFare: 80,
                        pricePerKm: 18,
                        seats: 6,
                        plateNumber: 'MH 12 EF 9012',
                        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
                        isAvailable: true
                    },
                    {
                        name: 'Honda City',
                        cabType: 'Sedan',
                        baseFare: 60,
                        pricePerKm: 14,
                        seats: 4,
                        plateNumber: 'TN 07 GH 3456',
                        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80',
                        isAvailable: true
                    },
                    {
                        name: 'Tata Nexon EV',
                        cabType: 'SUV',
                        baseFare: 70,
                        pricePerKm: 16,
                        seats: 5,
                        plateNumber: 'GJ 01 IJ 7890',
                        image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
                        isAvailable: true
                    },
                    {
                        name: 'Mercedes-Benz E-Class',
                        cabType: 'Luxury',
                        baseFare: 150,
                        pricePerKm: 35,
                        seats: 4,
                        plateNumber: 'DL 04 LX 9999',
                        image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80',
                        isAvailable: true
                    }
                ];
                await Car.insertMany(sampleCars);
                console.log('Seeded 6 initial sample cars to MongoDB.');
            }
        } else {
            // Ensure local store is initialized
            const store = loadData();
            console.log(`Seeded/loaded ${store.cars?.length || 6} cars from automatic JSON persistence store.`);
        }
    } catch (err) {
        console.error('Error auto-seeding cars:', err.message);
    }
};

const PORT = process.env.PORT || 8000;

// Connect Database & Start Server
connectDB().then(() => {
    app.listen(PORT, async () => {
        console.log(`Server running on port ${PORT} 🚀`);
        await autoSeedCars();
    });
});
