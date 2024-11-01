import express from 'express';
const router = express.Router();
import db from '../config/db.js';  // Adjust this import as per your db config

// Add an employee to a payroll list with a specific job position
router.post('/', async (req, res) => {
    const { payroll_list_id, employee_id, position_id } = req.body;
    try {
        await db.query(
            'INSERT INTO PayrollEntries (payroll_list_id, employee_id, position_id) VALUES (?, ?, ?)',
            [payroll_list_id, employee_id, position_id]
        );
        res.status(201).send('Payroll entry created');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Additional endpoints: GET, PUT, DELETE for payroll entries

export default router;
