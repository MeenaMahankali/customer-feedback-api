"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFeedbackService = exports.updateFeedbackService = exports.insertFeedbackService = void 0;
const database_1 = __importDefault(require("../database"));
const insertFeedbackService = async (user_id, feedback) => {
    try {
        const result = await database_1.default.query('INSERT INTO feedback (user_id, feedback) VALUES ($1, $2) RETURNING *', [user_id, feedback]);
        return result.rows[0];
    }
    catch (error) {
        console.error('Error in adding feedback', error);
        throw error;
    }
};
exports.insertFeedbackService = insertFeedbackService;
const updateFeedbackService = async (id, feedback) => {
    try {
        const result = await database_1.default.query('UPDATE feedback SET feedback = $1 WHERE id = $2 RETURNING *', [feedback, id]);
        return result.rows[0];
    }
    catch (error) {
        console.error('Error updating feedback', error);
        throw error;
    }
};
exports.updateFeedbackService = updateFeedbackService;
const deleteFeedbackService = async (id) => {
    try {
        await database_1.default.query('DELETE FROM feedback WHERE id = $1', [id]);
    }
    catch (error) {
        console.error('Error in deleting feedback', error);
        throw error;
    }
};
exports.deleteFeedbackService = deleteFeedbackService;
//# sourceMappingURL=feedbackService.js.map