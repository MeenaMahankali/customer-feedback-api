import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Create a new client instance with connection details from environment variables
const client = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

// Connect to PostgreSQL
client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch((err: any) => console.error('Connection error', err));

// Export the client instance for use in other parts of your application
export default client;
