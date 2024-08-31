"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.updateUserData = exports.deleteUserData = exports.createUser = void 0;
const database_1 = __importDefault(require("../database"));
const password_1 = require("../utils/password");
const createUser = async (first_name, last_name, username, email, mobile, password, roles) => {
    try {
        console.log(username, roles);
        const query = 'INSERT INTO users (first_name,last_name, username,email,mobile, password,roles) VALUES ($1, $2, $3,$4,$5,$6,$7) RETURNING *';
        const values = [first_name, last_name, username, email, mobile, password, roles];
        const result = await database_1.default.query(query, values);
        return result.rows[0];
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};
exports.createUser = createUser;
const deleteUserData = async (id) => {
    try {
        const query = 'DELETE FROM users WHERE id = $1';
        const values = [id];
        await database_1.default.query(query, values);
    }
    catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};
exports.deleteUserData = deleteUserData;
const updateUserData = async (id, username, password, email, first_name, last_name, mobile, roles) => {
    try {
        // Prepare the values for the update query
        let query = 'UPDATE users SET';
        const values = [];
        let index = 1;
        if (username) {
            query += ` username = $${index},`;
            values.push(username);
            index++;
        }
        if (email) {
            query += ` email = $${index},`;
            values.push(email);
            index++;
        }
        if (password) {
            const hashedPassword = await (0, password_1.hashPassword)(password);
            query += ` password = $${index},`;
            values.push(hashedPassword);
            index++;
        }
        if (first_name) {
            query += ` first_name = $${index},`;
            values.push(first_name);
            index++;
        }
        if (last_name) {
            query += ` last_name = $${index},`;
            values.push(last_name);
            index++;
        }
        if (mobile) {
            query += ` mobile = $${index},`;
            values.push(mobile);
            index++;
        }
        if (roles) {
            query += ` roles = $${index},`;
            values.push(roles);
            index++;
        }
        if (values.length === 0) {
            throw new Error('No fields to update');
        }
        // Remove the trailing comma and add the WHERE clause
        query = query.slice(0, -1) + ` WHERE id = $${index} RETURNING *`;
        values.push(id);
        // Execute the query
        const result = await database_1.default.query(query, values);
        return result.rows[0];
    }
    catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};
exports.updateUserData = updateUserData;
const getUser = async (username) => {
    try {
        // Query the database for the user by username
        const query = 'SELECT * FROM users WHERE username = $1';
        const result = await database_1.default.query(query, [username]);
        // If a user is found, return the user data
        if (result.rows.length > 0) {
            return result.rows[0];
        }
        // If no user is found, return null
        return null;
    }
    catch (error) {
        console.error('Error fetching user by username:', error);
        throw new Error('Unable to retrieve user');
    }
};
exports.getUser = getUser;
//# sourceMappingURL=userService.js.map