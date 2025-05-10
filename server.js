import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';
import './database/connection.js';
import './models/migrate.js';
import analytics from './routes/analytics.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/analytics', analytics);

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
    console.log(colors.blue(`Server is running on http://localhost:${PORT}`));
});