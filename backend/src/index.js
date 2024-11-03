import express from "express";
import pkg from "body-parser";
import { config } from "dotenv";
import registerUserRouter from "./routes/Users/registerUser.js";
import loginUserRouter from "./routes/Users/loginUser.js";
import payrollListsRouter from "./routes/Payroll/payrollLists.js";
import jobPositionsRouter from "./routes/JobPosition/jobPositions.js";
import payrollEntriesRouter from "./routes/Payroll/payrollEntries.js";
import { initializeDatabase } from "./config/initializeDatabase.js"; // Adjust the path accordingly
import cors from "cors";

const { json } = pkg;
config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*', // Change this to your frontend's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Middleware
app.use(json());

// Define an async function to initialize the database and start the server
(async () => {
  try {
    // Wait for the database to initialize
    await initializeDatabase();
    console.log("Database initialized successfully.");

    // Routes
    // Users
    app.use("/api/user/register", registerUserRouter);
    app.use("/api/user/login", loginUserRouter);

    // Payroll
    app.use("/api/payroll-lists", payrollListsRouter);

    // Job Positions
    app.use("/api/job-positions", jobPositionsRouter);

    // Payroll Entries
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
