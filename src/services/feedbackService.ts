import client from '../database';
import { Feedback } from '../models/Feedback';

export const insertFeedbackService = async (user_id: number, feedback: string): Promise<Feedback> => {
    try {
        const result = await client.query(
            'INSERT INTO feedback (user_id, feedback) VALUES ($1, $2) RETURNING *',
            [user_id, feedback]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error in adding feedback', error);
        throw error;
    }
};

export const updateFeedbackService = async (id: number, feedback: string): Promise<Feedback> => {
    try {
        const result = await client.query(
            'UPDATE feedback SET feedback = $1 WHERE id = $2 RETURNING *',
            [feedback, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error updating feedback', error);
        throw error;
    }
};

export const deleteFeedbackService = async (id: number): Promise<void> => {
    try {
        await client.query('DELETE FROM feedback WHERE id = $1', [id]);
    } catch (error) {
        console.error('Error in deleting feedback', error);
        throw error;
    }
};
