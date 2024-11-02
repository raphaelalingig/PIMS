import express from "express";
import pkg from "body-parser";
import { config } from "dotenv";
import registerUserRouter from "./routes/Users/registerUser.js";
import payrollListsRouter from "./routes/Payroll/payrollLists.js";
import jobPositionsRouter from "./routes/JobPosition/jobPositions.js";
import payrollEntriesRouter from "./routes/Payroll/payrollEntries.js";
import { initializeDatabase } from "./config/initializeDatabase.js"; // Adjust the path accordingly

const { json } = pkg;
config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(json());

// Define an async function to initialize the database and start the server
(async () => {
  try {
    // Wait for the database to initialize
    await initializeDatabase();
    console.log("Database initialized successfully.");

    // Routes
    app.use("/api/user/register", registerUserRouter);
    app.use("/api/payroll-lists", payrollListsRouter);
    app.use("/api/job-positions", jobPositionsRouter);
    app.use("/api/payroll-entries", payrollEntriesRouter);

    // Base Route
    app.get("/", (req, res) => {
      res.send("Payroll Management API");
    });

    // Start the server only after database initialization
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize the database. Server not started.");
    process.exit(1); // Exit the process if initialization fails
  }
})();
