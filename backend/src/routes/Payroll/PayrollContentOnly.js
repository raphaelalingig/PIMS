import express from "express";
const router = express.Router();
import db from "../../config/db.js";

router.post("/:payroll_list_id", async (req, res) => {
  const { payroll_list_id } = req.params;
  try {
    const [rows] = await db.query(
      "SELECT * FROM PayrollLists WHERE payroll_list_id = ?",
      [payroll_list_id]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
