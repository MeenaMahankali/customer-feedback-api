const express = require('express');
const router = express.Router();
import * as userController from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

router.post('/user/register', userController.registerUser);
router.put('/user/:id', authenticateToken, userController.updateUser);
router.delete('/user/:id', authenticateToken, userController.deleteUser);
router.post('/user/login', userController.loginUser);

export default router;


