import express from 'express';
const router = express.Router();
import db from '../config/db.js';  // Adjust this import as per your db config

// Create a new user
router.post('/', async (req, res) => {
    const { first_name, last_name, mobile_number, email, password } = req.body;
    try {
        await db.query(
            'INSERT INTO Users (first_name, last_name, mobile_number, email, password) VALUES (?, ?, ?, ?, ?)',
            [first_name, last_name, mobile_number, email, password]
        );
        res.status(201).send('User created successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Additional endpoints: GET, PUT, DELETE for users can be created similarly

export default router;  // Export as default
