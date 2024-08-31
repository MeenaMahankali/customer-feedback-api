import { insertFeedbackService, updateFeedbackService, deleteFeedbackService } from '../services/feedbackService';
import { Request, Response } from 'express';


export const insertFeedback = async (req: Request, res: Response) => {
    try {
        const { user_id, feedback } = req.body;
        const newFeedback = await insertFeedbackService(user_id, feedback);
        res.status(201).json(newFeedback);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateFeedback = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const { feedback } = req.body;
        const updatedFeedback = await updateFeedbackService(id, feedback);
        res.json(updatedFeedback);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteFeedback = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        await deleteFeedbackService(id);
        res.status(204).end();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
