import express from "express";
const router = express.Router();
import db from "../../config/db.js";

// POST route to add a new payroll employee
router.post("/", async (req, res) => {
  try {
    const {
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
    } = req.body;

    // Validate required fields
    if (
      !payroll_list_id ||
      !employee_name ||
      !job_position ||
      !mobile_number ||
      !basic_pay ||
      !salary_type ||
      !payment_status
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const query = `
            INSERT INTO PayrollEmployees (
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
                total_pay
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

    const values = [
      payroll_list_id,
      employee_name,
      job_position,
      mobile_number,
      basic_pay,
      salary_type,
      payment_status,
      overtime_status || null,
      overtime_hours || null,
      nightDifferential_status || null,
      nightDifferential_hours || null,
      deductions_status || null,
      deduction_reason || null,
      deductions_amount || null,
      total_pay,
    ];

    const [result] = await db.query(query, values);

    res.status(201).json({
      success: true,
      message: "Employee added successfully",
      data: {
        id: result.insertId,
        ...req.body,
      },
    });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add employee",
      error: error.message,
    });
  }
});

export default router;
