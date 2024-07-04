import { generateTokenService } from '../utils/generateToken';
import { createUserService } from './../services/userService';
import { Request, Response } from 'express';

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, roles } = req.body;
        const newUser = await createUserService(username, roles);
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }

};
export const generateToken = async (req: Request, res: Response) => {
    try {
        const { id, username, role } = req.body;
        const token = generateTokenService(id, username, role);
        res.status(201).json(token);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }

};
