const express = require('express');
const router = express.Router();
import * as movieController from '../controllers/movieController';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware';



router.get('/movies', authenticateToken, authorizeRoles(['admin', 'user']), movieController.getAllMovies);
router.get('/search', authenticateToken, authorizeRoles(['admin', 'user']), movieController.searchMovies);

// Require "admin" role for these routes
router.post('/movies', authenticateToken, authorizeRoles(['admin']), movieController.createMovie);
router.put('/movies/:id', authenticateToken, authorizeRoles(['admin']), movieController.updateMovie);
router.delete('/movies/:id', authenticateToken, authorizeRoles(['admin']), movieController.deleteMovie);

export default router;
