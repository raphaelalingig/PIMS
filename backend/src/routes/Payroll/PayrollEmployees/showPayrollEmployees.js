import express from "express";
const router = express.Router();
import db from "../../../config/db.js";

// POST route to fetch payroll employees by payroll_list_id
router.post("/", async (req, res) => {
  try {
    const { payroll_list_id } = req.body;

    // Validate required field
    if (!payroll_list_id) {
      return res.status(400).json({
        success: false,
        message: "Payroll list ID is required",
      });
    }

    const query = `
      SELECT * FROM PayrollEmployees 
      WHERE payroll_list_id = ?
      ORDER BY created_date DESC
    `;

    const [employees] = await db.query(query, [payroll_list_id]);

    if (employees.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No employees found for this payroll list",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Employees retrieved successfully",
      data: employees,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch employees",
      error: error.message,
    });
  }
});

export default router;
