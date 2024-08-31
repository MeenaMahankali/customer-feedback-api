"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.loginUser = exports.registerUser = void 0;
const generateToken_1 = require("../utils/generateToken");
const password_1 = require("../utils/password");
const userService_1 = require("./../services/userService");
const registerUser = async (req, res) => {
    try {
        const { username, password, email, first_name, last_name, mobile, roles } = req.body;
        // Assign a default role if not provided
        const userRoles = roles && roles.length > 0 ? roles : ['user'];
        //Validate input
        if (!username || !password || !email || !first_name || !last_name || !mobile) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        // Hash password
        const hashedPassword = await (0, password_1.hashPassword)(password);
        // Create user
        const newUser = await (0, userService_1.createUser)(first_name, last_name, username, email, mobile, hashedPassword, userRoles);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Retrieve the user by username
        const user = await (0, userService_1.getUser)(username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Compare the provided password with the stored hashed password
        const isPasswordValid = await (0, password_1.comparePasswords)(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = (0, generateToken_1.generateTokenService)(username, user.roles);
        res.status(200).json({ message: 'Login successful', token });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.loginUser = loginUser;
const updateUser = async (req, res) => {
    try {
        const { id, username, password, email, first_name, last_name, mobile, roles } = req.body;
        // Update user
        await (0, userService_1.updateUserData)(id, username, password, email, first_name, last_name, mobile, roles);
        res.status(201).json({ message: 'User updated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        // Delete user
        await (0, userService_1.deleteUserData)(id);
        res.status(201).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map