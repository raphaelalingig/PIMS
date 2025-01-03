import express from "express";
const router = express.Router();
import db from "../../config/db.js"; // Adjust this import as per your db config

// Create a new user
router.post("/", async (req, res) => {
  const { first_name, last_name, mobile_number, email, password } = req.body;

  // Validation: Check for missing fields
  const requiredFields = [
    { name: "First_name", value: first_name },
    { name: "Last_name", value: last_name },
    { name: "Mobile_number", value: mobile_number },
    { name: "Email", value: email },
    { name: "Password", value: password },
  ];

  for (const field of requiredFields) {
    if (!field.value) {
      return res.status(400).json({
        Status: "400 Bad Request",
        message: `${field.name.replace("_", " ")} field is required`,
      });
    }
  }

  try {
    await db.query(
      "INSERT INTO Users (first_name, last_name, mobile_number, email, password) VALUES (?, ?, ?, ?, ?)",
      [first_name, last_name, mobile_number, email, password]
    );

    // Respond with a structured JSON response
    res.status(200).json({
      Status: "success",
      Data: {
        first_name,
        last_name,
        mobile_number,
        email,
        password,
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Additional endpoints: GET, PUT, DELETE for users can be created similarly

export default router; // Export as default
