import client from '../database';
import { User } from '../models/User';
import { v4 as uuidv4 } from 'uuid';

export const createUserService = async (username: string, roles: []): Promise<User> => {
    try {
        console.log(username, roles)
        const id = uuidv4();
        const query = 'INSERT INTO users (id, username, roles) VALUES ($1, $2, $3) RETURNING *';
        const values = [id, username, roles];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

