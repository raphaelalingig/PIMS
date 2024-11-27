import express from "express";
const router = express.Router();
import db from "../../config/db.js"; // Adjust this import based on your project structure

// Create a new payroll list
router.post("/", async (req, res) => {
  const { user_id, list_name, status, description } = req.body;

  // Validate input
  if (!user_id || !list_name) {
    return res
      .status(400)
      .json({ error: "user_id and list_name are required." });
  }

  try {
    // Insert into PayrollLists table
    const query = `
      INSERT INTO PayrollLists (user_id, list_name, status, description) 
      VALUES (?, ?, ?, ?)
    `;
    const values = [user_id, list_name, status ?? 1, description ?? null];

    const result = await db.query(query, values);

    res.status(200).json({
      message: "Payroll list created successfully.",
      status: "200 OK",
      payroll_list_id: result.insertId, // Ensure your db driver supports returning insertId
    });
  } catch (error) {
    console.error("Error inserting into PayrollLists:", error);

    // Handle foreign key constraint violation
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res
        .status(400)
        .json({ error: "Invalid user_id. User does not exist." });
    }

    // General error handling
    res
      .status(500)
      .json({ error: "An error occurred while creating the payroll list." });
  }
});

export default router;
