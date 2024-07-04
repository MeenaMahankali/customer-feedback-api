import { searchMoviesService, updateMovieService, getAllMoviesService, addMovieService, deleteMovieService } from './../services/movieService';
import { Request, Response } from 'express';

export const getAllMovies = async (req: Request, res: Response) => {
    try {
        const movies = await getAllMoviesService();
        res.json(movies);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const searchMovies = async (req: Request, res: Response) => {
    try {
        const query = req.query.q as string;
        const movies = await searchMoviesService(query);
        res.json(movies);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createMovie = async (req: Request, res: Response) => {
    try {
        const { title, genre, rating, streaming_link } = req.body;
        const newMovie = await addMovieService(title, genre, rating, streaming_link);
        res.status(201).json(newMovie);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateMovie = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const { title, genre, rating, streaming_link } = req.body;
        const updatedMovie = await updateMovieService(id, title, genre, rating, streaming_link);
        res.json(updatedMovie);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteMovie = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        await deleteMovieService(id);
        res.status(204).end();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
