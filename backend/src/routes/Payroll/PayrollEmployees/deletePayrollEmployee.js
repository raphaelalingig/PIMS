import express from "express";
const router = express.Router();
import db from "../../../config/db.js";

router.post("/", async (req, res) => {
  const { employee_id, payroll_list_id } = req.body;

  if (!employee_id || !payroll_list_id) {
    return res
      .status(400)
      .json({ error: "employee_id and payroll_list_id are required." });
  }

  try {
    // Start a transaction to ensure data consistency
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
      // First delete related records in ShareToken table
      const deleteShareTokenQuery = `DELETE FROM ShareToken WHERE employee_id = ?`;
      await connection.query(deleteShareTokenQuery, [employee_id]);

      // Then delete the employee record
      const deleteEmployeeQuery = `DELETE FROM PayrollEmployees WHERE employee_id = ? AND payroll_list_id = ?`;
      await connection.query(deleteEmployeeQuery, [
        employee_id,
        payroll_list_id,
      ]);

      // If both operations succeed, commit the transaction
      await connection.commit();
      connection.release();

      res
        .status(200)
        .json({ message: "Payroll employee deleted successfully." });
    } catch (error) {
      // If any operation fails, rollback the transaction
      await connection.rollback();
      connection.release();
      throw error;
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
