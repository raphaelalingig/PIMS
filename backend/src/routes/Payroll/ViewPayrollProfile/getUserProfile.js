import express from "express";
import db from "../../../config/db.js";

const router = express.Router();

router.post("/:share_token", async (req, res) => {
  try {
    const { share_token } = req.params;

    if (!share_token) {
      return res.status(400).json({
        success: false,
        error: "Share token is required.",
      });
    }

    // Get employee ID from share token
    const [getEmployeeID] = await db.query(
      "SELECT employee_id FROM ShareToken WHERE share_token = ?",
      [share_token]
    );

    // Check if share token exists and returns an employee
    if (!getEmployeeID || getEmployeeID.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Invalid share token or employee not found.",
      });
    }

    // Get employee information
    const [getEmployeeInfo] = await db.query(
      `SELECT 
        pe.*,
        pl.list_name as payroll_name
      FROM PayrollEmployees pe
      LEFT JOIN PayrollLists pl ON pe.payroll_list_id = pl.payroll_list_id
      WHERE pe.employee_id = ?`,
      [getEmployeeID[0].employee_id]
    );

    if (!getEmployeeInfo || getEmployeeInfo.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Employee information not found.",
      });
    }

    // Return employee information
    return res.status(200).json({
      success: true,
      Data: getEmployeeInfo[0],
    });
  } catch (error) {
    console.error("Error in view-payroll-profile:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

export default router;
