const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

// Middleware to authenticate token
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication token missing' });
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
        console.log(decoded, "decoded")
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        // Attach the user information to the request object

        (req as any).user = {
            id: decoded.id,
            username: decoded.username,
            role: decoded.role
        } as User;
        next();
    });
};

export const authorizeRoles = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole: string = (req as any).user.role;

        // Check if user has any of the required roles
        const allowed = roles.includes(userRole);

        if (allowed) {
            next();
        } else {
            res.status(403).json({ message: 'Unauthorized' });
        }
    };
};


module.exports = { authorizeRoles, authenticateToken }
