import express from "express";
const router = express.Router();
import db from "../../config/db.js"; // Adjust this import as per your db config

router.put("/", async (req, res) => {
  const { payroll_list_id, list_name, status, description } = req.body;

  // Validate input
  if (!payroll_list_id) {
    return res.status(400).json({ error: "payroll_list_id is required." });
  }

  try {
    const query = `
            UPDATE PayrollLists
            SET list_name = ?, status = ?, description = ?
            WHERE payroll_list_id = ?
        `;
    const values = [
      list_name,
      status ?? 0,
      description ?? null,
      payroll_list_id,
    ];

    await db.query(query, values);

    res.status(200).json({ message: "Payroll list updated successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
