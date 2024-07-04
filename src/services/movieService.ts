import client from '../database';
import { Movie } from '../models/Movie';

export const getAllMoviesService = async (): Promise<Movie[]> => {
    try {
        const result = await client.query('SELECT * FROM movies');
        return result.rows;
    } catch (error) {
        console.error('Error fetching movies', error);
        throw error;
    }
};

export const searchMoviesService = async (query: string): Promise<Movie[]> => {

    try {
        const result = await client.query('SELECT * FROM movies WHERE title ILIKE $1 OR genre ILIKE $1', [`%${query}%`]);
        return result.rows;
    } catch (error) {
        console.error('Error searching movies', error);
        throw error;
    }
};

export const addMovieService = async (title: string, genre: string, rating: number, streaming_link: string): Promise<Movie> => {
    try {
        const result = await client.query(
            'INSERT INTO movies (title, genre, rating, streaming_link) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, genre, rating, streaming_link]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error in adding movie', error);
        throw error;
    }
};

export const updateMovieService = async (id: number, title: string, genre: string, rating: number, streaming_link: string): Promise<Movie> => {
    try {
        const result = await client.query(
            'UPDATE movies SET title = $1, genre = $2, rating = $3, streaming_link = $4 WHERE id = $5 RETURNING *',
            [title, genre, rating, streaming_link, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error updating movie', error);
        throw error;
    }
};

export const deleteMovieService = async (id: number): Promise<void> => {
    try {
        await client.query('DELETE FROM movies WHERE id = $1', [id]);
    } catch (error) {
        console.error('Error in deleting movie', error);
        throw error;
    }
};
