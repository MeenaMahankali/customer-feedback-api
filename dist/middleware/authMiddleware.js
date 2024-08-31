"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.authenticateToken = void 0;
const jwt = require('jsonwebtoken');
// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentication token missing' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        console.log(decoded, "decoded");
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        // Attach the user information to the request object
        req.user = {
            username: decoded.username,
            roles: decoded.roles
        };
        next();
    });
};
exports.authenticateToken = authenticateToken;
const authorizeRoles = (roles) => {
    return (req, res, next) => {
        const userRoles = req.user.roles;
        const allowed = userRoles.some(role => roles.includes(role));
        if (allowed) {
            next();
        }
        else {
            res.status(403).json({ message: 'Unauthorized' });
        }
    };
};
exports.authorizeRoles = authorizeRoles;
module.exports = { authorizeRoles: exports.authorizeRoles, authenticateToken: exports.authenticateToken };
//# sourceMappingURL=authMiddleware.js.map