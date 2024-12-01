import express from "express";
const router = express.Router();
import db from "../../../config/db.js";

router.delete("/", async (req, res) => {
  try {
    const { employee_id, payroll_list_id } = req.body;

    // Validate required fields
    if (!employee_id || !payroll_list_id) {
      return res.status(400).json({
        success: false,
        message:
          "Both Employee ID and Payroll List ID are required for deletion",
      });
    }

    // Check if employee exists with both IDs
    const checkQuery =
      "SELECT * FROM PayrollEmployees WHERE employee_id = ? AND payroll_list_id = ?";
    const [existingEmployee] = await db.query(checkQuery, [
      employee_id,
      payroll_list_id,
    ]);

    if (existingEmployee.length === 0) {
      return res.status(404).json({
        success: false,
        message:
          "Employee not found with the provided Employee ID and Payroll List ID",
      });
    }

    // Delete the employee
    const deleteQuery =
      "DELETE FROM PayrollEmployees WHERE employee_id = ? AND payroll_list_id = ?";
    await db.query(deleteQuery, [employee_id, payroll_list_id]);

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
      data: existingEmployee[0],
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete employee",
      error: error.message,
    });
  }
});

export default router;
