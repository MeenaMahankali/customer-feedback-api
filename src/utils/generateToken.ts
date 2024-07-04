import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET || '';


export function generateTokenService(id: string, username: string, role: string) {
    const payload = { id, username, role }
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Example expiration time of 1 hour
}