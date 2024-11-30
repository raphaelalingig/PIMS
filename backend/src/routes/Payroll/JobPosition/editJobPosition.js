import express from "express";
const router = express.Router();
import db from "../../../config/db.js"; // Adjust this import as per your db config

router.put("/", async (req, res) => {
  const { job_position_id, title, salary } = req.body;

  if (!job_position_id) {
    return res.status(400).json({ error: "job_position_id is required." });
  }

  try {
    const query = `
        UPDATE JobPositions
        SET title = ?, salary = ?
        WHERE job_position_id = ?
      `;
    await db.query(query, [title, salary, job_position_id]);
    res.status(200).json({ message: "Job position updated successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
