import { generateTokenService } from '../utils/generateToken';
import { comparePasswords, hashPassword } from '../utils/password';
import { createUser, getUser, updateUserData, deleteUserData } from './../services/userService';
import { Request, Response } from 'express';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, password, email, first_name, last_name, mobile, roles } = req.body;

        // Assign a default role if not provided
        const userRoles = roles && roles.length > 0 ? roles : ['user'];

        //Validate input
        if (!username || !password || !email || !first_name || !last_name || !mobile) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create user
        const newUser = await createUser(first_name, last_name, username, email, mobile, hashedPassword, userRoles);

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }

};
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // Retrieve the user by username
        const user = await getUser(username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await comparePasswords(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateTokenService(username, user.roles);

        res.status(200).json({ message: 'Login successful', token });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }

};
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id, username, password, email, first_name, last_name, mobile, roles } = req.body;

        // Update user
        await updateUserData(id, username, password, email, first_name, last_name, mobile, roles);

        res.status(201).json({ message: 'User updated successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }

};
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        // Delete user
        await deleteUserData(id);

        res.status(201).json({ message: 'User deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }

};
