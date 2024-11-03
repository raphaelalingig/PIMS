import express from "express";
const router = express.Router();
import db from "../../config/db.js"; // Adjust this import as per your db config

// Login a user
router.post("/", async (req, res) => {
    const { email, password } = req.body;

    // Validation: Check for missing fields
    const requiredFields = [
        { name: "email", value: email },
        { name: "password", value: password },
    ];

    for (const field of requiredFields) {
        if (!field.value) {
            return res.status(400).json({
                status: "400 Bad Request",
                message: `${field.name.replace("_", " ")} field is required`,
            });
        }
    }

    try {
        // Query the database for a user with the provided email and password
        const [results] = await db.query(
            "SELECT * FROM Users WHERE email = ? AND password = ?",
            [email, password]
        );

        // Check if any user was found
        if (results.length === 0) {
            return res.status(401).json({
                status: "401 Unauthorized",
                message: "The email or password you entered is incorrect. Please try again.",
            });
        }

        // If a user is found, send a success response
        res.status(200).json({
            status: "success",
            message: "Login successful",
        });
    } catch (error) {
        res.status(500).json({
            status: "500 Internal Server Error",
            message: error.message,
        });
    }
});

export default router;
