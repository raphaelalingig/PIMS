import express from "express";
const router = express.Router();
import db from "../../../config/db.js";

router.put("/", async (req, res) => {
  try {
    const {
      employee_id, // Required to identify which employee to update
      payroll_list_id,
      employee_name,
      job_position,
      mobile_number,
      basic_pay,
      salary_type,
      payment_status,
      overtime_status,
      overtime_hours,
      nightDifferential_status,
      nightDifferential_hours,
      deductions_status,
      deduction_reason,
      deductions_amount,
      total_pay,
      salary_date,
      job_position_id,
    } = req.body;

    // Validate required employee_id
    if (!employee_id) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required for updating",
      });
    }

    // Check if employee exists
    const checkQuery = "SELECT * FROM PayrollEmployees WHERE employee_id = ?";
    const [existingEmployee] = await db.query(checkQuery, [employee_id]);

    if (existingEmployee.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const updateQuery = `
      UPDATE PayrollEmployees 
      SET 
        payroll_list_id = ?,
        employee_name = ?,
        job_position = ?,
        mobile_number = ?,
        basic_pay = ?,
        salary_type = ?,
        payment_status = ?,
        overtime_status = ?,
        overtime_hours = ?,
        nightDifferential_status = ?,
        nightDifferential_hours = ?,
        deductions_status = ?,
        deduction_reason = ?,
        deductions_amount = ?,
        total_pay = ?,
        salary_date= ?,
        job_position_id =?
      WHERE employee_id = ?
    `;

    const values = [
      payroll_list_id || existingEmployee[0].payroll_list_id,
      employee_name || existingEmployee[0].employee_name,
      job_position || existingEmployee[0].job_position,
      mobile_number || existingEmployee[0].mobile_number,
      basic_pay || existingEmployee[0].basic_pay,
      salary_type || existingEmployee[0].salary_type,
      payment_status || existingEmployee[0].payment_status,
      overtime_status !== undefined
        ? overtime_status
        : existingEmployee[0].overtime_status,
      overtime_hours !== undefined
        ? overtime_hours
        : existingEmployee[0].overtime_hours,
      nightDifferential_status !== undefined
        ? nightDifferential_status
        : existingEmployee[0].nightDifferential_status,
      nightDifferential_hours !== undefined
        ? nightDifferential_hours
        : existingEmployee[0].nightDifferential_hours,
      deductions_status !== undefined
        ? deductions_status
        : existingEmployee[0].deductions_status,
      deduction_reason || existingEmployee[0].deduction_reason,
      deductions_amount !== undefined
        ? deductions_amount
        : existingEmployee[0].deductions_amount,
      total_pay !== undefined ? total_pay : existingEmployee[0].total_pay,
      salary_date || existingEmployee[0].salary_date,
      job_position_id || existingEmployee[0].job_position_id,
      employee_id, // Moved to the end to match WHERE clause
    ];

    await db.query(updateQuery, values);

    // Fetch the updated employee data
    const [updatedEmployee] = await db.query(checkQuery, [employee_id]);

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: updatedEmployee[0],
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update employee",
      error: error.message,
    });
  }
});

export default router;
