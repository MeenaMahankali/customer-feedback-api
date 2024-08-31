import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET || '';


export function generateTokenService(username: string, roles: [string]) {
    const payload = { username, roles }
    return jwt.sign(payload, JWT_SECRET); // omitting for now { expiresIn: '1h' }
}
