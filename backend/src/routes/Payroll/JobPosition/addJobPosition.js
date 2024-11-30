import express from "express";
const router = express.Router();
import db from "../../../config/db.js"; // Adjust this import as per your db config

router.post("/", async (req, res) => {
  const { title, salary, payroll_list_id } = req.body;

  if (!title || !salary || !payroll_list_id) {
    return res
      .status(400)
      .send("Title, payroll_list_id and salary are required.");
  }
  try {
    await db.query(
      "INSERT INTO JobPositions (title, salary, payroll_list_id) VALUES (?, ?, ?)",
      [title, salary, payroll_list_id]
    ); 
    res.status(201).send("Job position created");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
