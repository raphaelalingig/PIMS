import express from "express";
import crypto from "crypto";
import db from "../../../config/db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { user_id, employee_id } = req.body;

  if (!user_id || !employee_id) {
    return res.status(400).json({ message: "user_id and employee_id are required." });
  }

  try {
    // Verify if the user exists in the database
    const [user] = await db.query(
      "SELECT user_id, email, first_name, last_name FROM Users WHERE user_id = ?",
      [user_id]
    );

    const [employee] = await db.query(
      "SELECT * FROM PayrollEmployees WHERE employee_id = ?",
      [employee_id]
    );

    if (!employee || employee.length === 0) {
      return res.status(404).json({ message: "Employee not found." });
    }

    if (!user || user.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate a random token
    const token = crypto.randomBytes(3).toString("hex");

    // Insert the token into the ShareToken table
    const [result] = await db.query(
      "INSERT INTO ShareToken (user_id, employee_id, share_token) VALUES (?, ?, ?)",
      [user_id, employee_id, token]
    );

    if (!result.insertId) {
      throw new Error("Failed to insert token into database");
    }

    // Return success response with token
    res.json({
      success: true,
      share_token: token,
      share_token_id: result.insertId,
      message: "Token generated and stored successfully.",
    });
  } catch (error) {
    console.error("Error generating/storing token:", error);
    res.status(500).json({ error: "Server error while processing your request." });
  }
});

export default router;