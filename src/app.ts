import express from 'express';
import bodyParser from 'body-parser';
import movieRoutes from './routes/movieRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
app.use(bodyParser.json());
app.use('/api', movieRoutes);
app.use('/api', userRoutes)

export default app;
