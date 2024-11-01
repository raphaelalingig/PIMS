import express from 'express';
import pkg from 'body-parser';
import { config } from 'dotenv';
import usersRouter from './routes/users.js';
import payrollListsRouter from './routes/payrollLists.js';
import jobPositionsRouter from './routes/jobPositions.js';
import payrollEntriesRouter from './routes/payrollEntries.js';

const { json } = pkg;
config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - moved before routes
app.use(json());

// Routes
app.use('/api/users', usersRouter);
app.use('/api/payroll-lists', payrollListsRouter);
app.use('/api/job-positions', jobPositionsRouter);
app.use('/api/payroll-entries', payrollEntriesRouter);

// Base Route
app.get('/', (req, res) => {
    res.send('Payroll Management API');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});