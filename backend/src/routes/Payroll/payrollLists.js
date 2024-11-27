import express from "express";
const router = express.Router();
import db from "../../config/db.js"; // Adjust the path as per your project structure

// Get payroll entries for a specific user
router.post("/:user_id", async (req, res) => {
  const { user_id } = req.params; // Extract user_id from the request body

  // Validate the input
  if (!user_id) {
    return res
      .status(400)
      .json({ error: "user_id is required in the request body." });
  }

  try {
    // Query the database for payroll entries belonging to the specified user
    const query = `
      SELECT * 
      FROM PayrollLists 
      WHERE user_id = ?
    `;
    const [rows] = await db.query(query, [user_id]); // Assuming db.query returns [rows]

    // Check if rows exist
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No payroll entries found for this user." });
    }

    res.status(200).json(rows); // Return the rows
  } catch (error) {
    console.error("Error fetching payroll entries:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching payroll entries." });
  }
});

export default router;
