const express = require('express');
const router = express.Router();
import * as feedbackController from '../controllers/feedbackController';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware';


router.post('/feedback', authenticateToken, authorizeRoles(['admin', 'user']), feedbackController.insertFeedback);
router.put('/feedback/:id', authenticateToken, authorizeRoles(['admin', 'user']), feedbackController.updateFeedback);
router.delete('/feedback/:id', authenticateToken, authorizeRoles(['admin']), feedbackController.deleteFeedback);

export default router;
