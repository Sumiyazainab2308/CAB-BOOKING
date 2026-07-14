const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');
const { loadData } = require('../db/store');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretjwtkey_ucab_2026');

            if (global.isMongoConnected) {
                if (decoded.role === 'admin') {
                    req.admin = await Admin.findById(decoded.id).select('-password');
                    req.user = req.admin;
                } else {
                    req.user = await User.findById(decoded.id).select('-password');
                }
            } else {
                const store = loadData();
                if (decoded.role === 'admin') {
                    req.admin = (store.admins || []).find(a => a._id === decoded.id);
                    req.user = req.admin;
                } else {
                    req.user = (store.users || []).find(u => u._id === decoded.id);
                }
            }

            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            req.userRole = decoded.role || 'user';
            next();
        } catch (error) {
            console.error("JWT verification failed:", error.message);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};

const adminOnly = (req, res, next) => {
    if (req.user && req.userRole === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Access denied: Admin resources only' });
    }
};

module.exports = { protect, adminOnly };
