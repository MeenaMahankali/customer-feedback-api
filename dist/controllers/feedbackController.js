"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFeedback = exports.updateFeedback = exports.insertFeedback = void 0;
const feedbackService_1 = require("../services/feedbackService");
const insertFeedback = async (req, res) => {
    try {
        const { user_id, feedback } = req.body;
        const newFeedback = await (0, feedbackService_1.insertFeedbackService)(user_id, feedback);
        res.status(201).json(newFeedback);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.insertFeedback = insertFeedback;
const updateFeedback = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { feedback } = req.body;
        const updatedFeedback = await (0, feedbackService_1.updateFeedbackService)(id, feedback);
        res.json(updatedFeedback);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateFeedback = updateFeedback;
const deleteFeedback = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await (0, feedbackService_1.deleteFeedbackService)(id);
        res.status(204).end();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteFeedback = deleteFeedback;
//# sourceMappingURL=feedbackController.js.map