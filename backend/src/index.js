import express from "express";
import pkg from "body-parser";
import { config } from "dotenv";
import registerUserRouter from "./routes/Users/registerUser.js";
import loginUserRouter from "./routes/Users/loginUser.js";
import addPayrollListsRouter from "./routes/Payroll/createPayroll.js";
import payrollEntriesRouter from "./routes/Payroll/payrollEntries.js";
import payrollListsRouter from "./routes/Payroll/payrollLists.js";
import deletePayrollRouter from "./routes/Payroll/deletePayroll.js";
import editPayrollRouter from "./routes/Payroll/editPayroll.js";
import getPayrollContentRouter from "./routes/Payroll/PayrollContentOnly.js";
import showJobPositions from "./routes/Payroll/JobPosition/showJobPositions.js";
import addJobpPositionRouter from "./routes/Payroll/JobPosition/addJobPosition.js";
import deleteJobPositionRouter from "./routes/Payroll/JobPosition/deleteJobPositions.js";
import editJobPositionRouter from "./routes/Payroll/JobPosition/editJobPosition.js";
import { initializeDatabase } from "./config/initializeDatabase.js"; // Adjust the path accordingly
import cors from "cors";

const { json } = pkg;
config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*", // Change this to your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

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

    //add
    app.use("/api/add/payroll-lists", addPayrollListsRouter);

    // get payroll base on id
    app.use("/api/payroll-lists", payrollListsRouter);
    app.use("/api/delete/payroll-lists", deletePayrollRouter);
    app.use("/api/edit/payroll-lists", editPayrollRouter);
    //Show only payroll content base on id
    app.use("/api/payroll-content", getPayrollContentRouter);

    // Job Positions
    app.use("/api/job-positions", showJobPositions);
    app.use("/api/add-job-positions", addJobpPositionRouter);
    app.use("/api/delete-job-positions", deleteJobPositionRouter);
    app.use("/api/edit-job-positions", editJobPositionRouter);

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
