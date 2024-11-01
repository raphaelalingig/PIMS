import express from 'express';
const router = express.Router();
import db from '../config/db.js';  // Adjust this import as per your db config

// Create a payroll list
router.post('/', async (req, res) => {
    const { user_id, list_name, status } = req.body;
    try {
        await db.query(
            'INSERT INTO PayrollLists (user_id, list_name, status) VALUES (?, ?, ?)',
            [user_id, list_name, status]
        );
        res.status(201).send('Payroll list created');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Additional endpoints: GET, PUT, DELETE for payroll lists

export default router;
