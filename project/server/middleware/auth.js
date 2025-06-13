const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware للتحقق من المصادقة
const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');

        if (!user || !user.isActive) {
            return res.status(401).json({ message: 'Invalid token or user deactivated.' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};

// Middleware للتحقق من الصلاحيات
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required.' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'Access denied. Insufficient permissions.'
            });
        }

        next();
    };
};

// Middleware للتحقق من صلاحية معينة
const hasPermission = (permission) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required.' });
        }

        if (req.user.role === 'admin' || req.user.permissions.includes(permission)) {
            return next();
        }

        res.status(403).json({
            message: `Access denied. Required permission: ${permission}`
        });
    };
};

// Middleware لتحديث آخر تسجيل دخول
const updateLastLogin = async (req, res, next) => {
    if (req.user) {
        try {
            await User.findByIdAndUpdate(req.user._id, {
                lastLogin: new Date()
            });
        } catch (error) {
            console.error('Error updating last login:', error);
        }
    }
    next();
};

module.exports = {
    authenticate,
    authorize,
    hasPermission,
    updateLastLogin
};