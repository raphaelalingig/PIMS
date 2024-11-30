import express from "express";
const router = express.Router();
import db from "../../../config/db.js"; // Adjust this import as per your db config

router.post("/", async (req, res) => {
  const { payroll_list_id } = req.body;

  if (!payroll_list_id) {
    return res.status(400).json({ error: "payroll_list_id is required." });
  }
  try {
    const [rows] = await db.query(
      "SELECT * FROM JobPositions where payroll_list_id = ?",
      [payroll_list_id]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
