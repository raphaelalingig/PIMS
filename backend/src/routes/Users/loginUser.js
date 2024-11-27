import express from "express";
import jwt from "jsonwebtoken"; // Import jsonwebtoken
const router = express.Router();
import db from "../../config/db.js"; // Adjust this import as per your db config

// Secret key for JWT (you should store this in an environment variable for production)
const JWT_SECRET = process.env.JWT_SECRET; // Replace with your secret key

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
        message:
          "The email or password you entered is incorrect. Please try again.",
      });
    }

    // User found, extract user_id and other details
    const user = results[0]; // Assuming the first result is the user
    const { user_id, email: userEmail, password: userPassword } = user;

    // Generate a JWT
    const token = jwt.sign({ id: user_id, email: userEmail }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send success response with the token and user_id
    res.status(200).json({
      status: "success",
      message: "Login successful",
      token, // Include the token in the response
      // Include user_id
      Data: {
        email: userEmail, // Include email for confirmation
        password: userPassword,
        user_id,
      },
      // Include password for confirmation
    });
  } catch (error) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: error.message,
    });
  }
});

export default router;
