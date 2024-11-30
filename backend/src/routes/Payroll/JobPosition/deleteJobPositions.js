import express from "express";
const router = express.Router();
import db from "../../../config/db.js"; // Adjust this import as per your db config

router.post("/", async (req, res) => {
  const { job_position_id } = req.body;

  if (!job_position_id) {
    return res.status(400).json({ error: "job_position_id is required." });
  }

  try {
    const query = `DELETE FROM JobPositions WHERE job_position_id = ?`;
    await db.query(query, [job_position_id]);
    res.status(200).json({ message: "Job position deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
