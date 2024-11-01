import { Router } from 'express';
const router = Router();
import db from '../config/db.js';  // Adjust this import as per your db config


// Create a job position
router.post('/', async (req, res) => {
    const { title, salary } = req.body;
    try {
        await db(
            'INSERT INTO JobPositions (title, salary) VALUES (?, ?)',
            [title, salary]
        );
        res.status(201).send('Job position created');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Additional endpoints: GET, PUT, DELETE for job positions

export default router;
