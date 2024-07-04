const dotenv = require('dotenv');
dotenv.config();
import client from '../src/database';
import {
    getAllMoviesService,
    searchMoviesService,
    addMovieService,
    updateMovieService,
    deleteMovieService
} from '../src/services/movieService';

async function cleanDatabase(): Promise<void> {
    try {
        await client.query('TRUNCATE TABLE movies RESTART IDENTITY CASCADE');
    } catch (error) {
        console.error('Error cleaning database:', error);
        throw error;
    }
}

describe('Movie Service Tests', () => {

    beforeEach(async () => {
        await cleanDatabase(); // Clean up the database before each test
    });

    it('getAllMoviesService - should return all movies', async () => {
        // Add test data
        await addMovieService('Kalki', 'Sci-Fi', 8, 'http://example.com/kalki');

        // Call the service function
        const movies = await getAllMoviesService();

        // Assert
        expect(movies.length).toBe(1);
        expect(movies[0].title).toBe('Kalki');
    });

    it('searchMoviesService - should return movies matching the query', async () => {
        // Add test data
        await addMovieService('Kalki', 'Sci-Fi', 8, 'http://example.com/kalki');

        // Call the service function
        const movies = await searchMoviesService('Sci-Fi');

        // Assert
        expect(movies.length).toBe(1);
        expect(movies[0].title).toBe('Kalki');
    });

    it('addMovieService - should add a new movie', async () => {
        // Call the service function
        const newMovie = await addMovieService('Kalki', 'Sci-Fi', 8, 'http://example.com/kalki');

        // Assert
        expect(newMovie.title).toBe('Kalki');
        expect(newMovie.genre).toBe('Sci-Fi');
        expect(newMovie.rating).toBe(8);
        expect(newMovie.streaming_link).toBe('http://example.com/kalki');
    });

    it('updateMovieService - should update movie information', async () => {
        // Add test data
        const { id } = await addMovieService('Kalki', 'Sci-Fi', 8, 'http://example.com/kalki');

        // Call the service function to update
        const updatedMovie = await updateMovieService(id, 'Kalki Updated', 'Sci-Fi Updated', 9.0, 'http://example.com/kalki-updated');

        // Assert
        expect(updatedMovie.title).toBe('Kalki Updated');
        expect(updatedMovie.genre).toBe('Sci-Fi Updated');
        expect(updatedMovie.rating).toBe(9.0);
        expect(updatedMovie.streaming_link).toBe('http://example.com/kalki-updated');
    });

    it('deleteMovieService - should delete a movie', async () => {
        // Add test data
        const { id } = await addMovieService('Kalki', 'Sci-Fi', 8, 'http://example.com/kalki');

        // Call the service function to delete
        await deleteMovieService(id);

        // Retrieve movies after deletion
        const moviesAfterDelete = await getAllMoviesService();

        // Assert
        expect(moviesAfterDelete.length).toBe(0);

    });
});
