import dotenv from 'dotenv';
dotenv.config();
import client from '../src/database';
import {
    insertFeedbackService,
    updateFeedbackService,
    deleteFeedbackService
} from '../src/services/feedbackService';

async function cleanDatabase(): Promise<void> {
    try {
        await client.query('TRUNCATE TABLE feedback RESTART IDENTITY CASCADE');
    } catch (error) {
        console.error('Error cleaning database:', error);
        throw error;
    }
}

describe('Feedback Service Tests', () => {

    beforeEach(async () => {
        await cleanDatabase(); // Clean up the database before each test
    });

    it('insertFeedbackService - should add a new feedback', async () => {
        const newFeedback = await insertFeedbackService(3, 'My Feedback');

        expect(newFeedback.user_id).toBe(3);
        expect(newFeedback.feedback).toBe('My Feedback');
    });

    it('updateFeedbackService - should update feedback', async () => {
        const { id } = await insertFeedbackService(3, 'My Feedback');
        const updatedFeedback = await updateFeedbackService(id, 'Feedback updated');

        expect(updatedFeedback.feedback).toBe('Feedback updated');
    });

    it('deleteFeedbackService - should delete a feedback', async () => {
        const { id } = await insertFeedbackService(3, 'My Feedback');
        await deleteFeedbackService(id);

        // Verify deletion
        const result = await client.query('SELECT * FROM feedback WHERE id = $1', [id]);
        expect(result.rows.length).toBe(0);
    });
});
