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
    const query = `DELETE FROM PayrollEmployees WHERE employee_id = ? AND payroll_list_id = ?`;
    await db.query(query, [employee_id, payroll_list_id]);
    res.status(200).json({ message: "Payroll employee deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
