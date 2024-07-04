const express = require('express');
const router = express.Router();
import * as userController from '../controllers/userController';

router.post('/user', userController.createUser);
router.post('/generateToken', userController.generateToken);
export default router;


