import express from 'express';
import bodyParser from 'body-parser';
import feedbackRoutes from './routes/feedbackRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
app.use(bodyParser.json());
app.use('/api', feedbackRoutes);
app.use('/api', userRoutes)

export default app;
