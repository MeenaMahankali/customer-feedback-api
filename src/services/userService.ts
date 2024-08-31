import client from '../database';
import { User } from '../models/User';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../utils/password';

export const createUser = async (first_name: string, last_name: string, username: string, email: string, mobile: string, password: string, roles: []): Promise<User> => {
    try {
        console.log(username, roles)
        const query = 'INSERT INTO users (first_name,last_name, username,email,mobile, password,roles) VALUES ($1, $2, $3,$4,$5,$6,$7) RETURNING *';
        const values = [first_name, last_name, username, email, mobile, password, roles];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const deleteUserData = async (id: string): Promise<void> => {
    try {
        const query = 'DELETE FROM users WHERE id = $1';
        const values = [id];
        await client.query(query, values);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

export const updateUserData = async (
    id: string,
    username?: string,
    password?: string,
    email?: string,
    first_name?: string,
    last_name?: string,
    mobile?: string,
    roles?: string[]
): Promise<User> => {
    try {
        // Prepare the values for the update query
        let query = 'UPDATE users SET';
        const values: any[] = [];
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
            const hashedPassword = await hashPassword(password);
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
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const getUser = async (username: string): Promise<User | null> => {
    try {
        // Query the database for the user by username
        const query = 'SELECT * FROM users WHERE username = $1';
        const result = await client.query(query, [username]);

        // If a user is found, return the user data
        if (result.rows.length > 0) {
            return result.rows[0] as User;
        }

        // If no user is found, return null
        return null;
    } catch (error) {
        console.error('Error fetching user by username:', error);
        throw new Error('Unable to retrieve user');
    }
};