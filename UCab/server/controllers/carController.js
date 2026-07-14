const Car = require('../models/Car');
const { loadData, saveData } = require('../db/store');

exports.getAllCars = async (req, res) => {
    try {
        const { type, search, sort } = req.query;

        if (global.isMongoConnected) {
            let filter = {};
            if (type && type !== 'All') {
                filter.cabType = type;
            }
            if (search) {
                filter.name = { $regex: search, $options: 'i' };
            }

            let query = Car.find(filter);
            if (sort === 'price-asc') query = query.sort({ pricePerKm: 1 });
            if (sort === 'price-desc') query = query.sort({ pricePerKm: -1 });

            const cars = await query.exec();
            return res.status(200).json(cars);
        } else {
            // Fallback JSON store
            const store = loadData();
            let cars = store.cars || [];

            if (type && type !== 'All') {
                cars = cars.filter(c => c.cabType === type);
            }
            if (search) {
                const s = search.toLowerCase();
                cars = cars.filter(c => c.name.toLowerCase().includes(s));
            }

            if (sort === 'price-asc') {
                cars.sort((a, b) => a.pricePerKm - b.pricePerKm);
            } else if (sort === 'price-desc') {
                cars.sort((a, b) => b.pricePerKm - a.pricePerKm);
            }

            return res.status(200).json(cars);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCarById = async (req, res) => {
    try {
        if (global.isMongoConnected) {
            const car = await Car.findById(req.params.id);
            if (!car) return res.status(404).json({ message: 'Car not found' });
            return res.status(200).json(car);
        } else {
            const store = loadData();
            const car = (store.cars || []).find(c => c._id === req.params.id);
            if (!car) return res.status(404).json({ message: 'Car not found' });
            return res.status(200).json(car);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCar = async (req, res) => {
    try {
        const { name, cabType, pricePerKm, baseFare, seats, plateNumber, image } = req.body;

        if (global.isMongoConnected) {
            const newCar = await Car.create({
                name,
                cabType,
                pricePerKm,
                baseFare,
                seats,
                plateNumber,
                image
            });
            return res.status(201).json(newCar);
        } else {
            const store = loadData();
            const newCar = {
                _id: 'car_' + Date.now(),
                name,
                cabType,
                pricePerKm: Number(pricePerKm),
                baseFare: Number(baseFare),
                seats: Number(seats),
                plateNumber,
                image: image || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80',
                isAvailable: true,
                createdAt: new Date().toISOString()
            };
            store.cars = [newCar, ...(store.cars || [])];
            saveData(store);
            return res.status(201).json(newCar);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCar = async (req, res) => {
    try {
        if (global.isMongoConnected) {
            const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedCar) return res.status(404).json({ message: 'Car not found' });
            return res.status(200).json(updatedCar);
        } else {
            const store = loadData();
            const index = (store.cars || []).findIndex(c => c._id === req.params.id);
            if (index === -1) return res.status(404).json({ message: 'Car not found' });

            store.cars[index] = { ...store.cars[index], ...req.body };
            saveData(store);
            return res.status(200).json(store.cars[index]);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCar = async (req, res) => {
    try {
        if (global.isMongoConnected) {
            await Car.findByIdAndDelete(req.params.id);
            return res.status(200).json({ message: 'Car deleted successfully' });
        } else {
            const store = loadData();
            store.cars = (store.cars || []).filter(c => c._id !== req.params.id);
            saveData(store);
            return res.status(200).json({ message: 'Car deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
