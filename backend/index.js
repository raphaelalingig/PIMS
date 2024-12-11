import express from "express";
import pkg from "body-parser";
import { config } from "dotenv";
import registerUserRouter from "./src/routes/Users/registerUser.js";
import loginUserRouter from "./src/routes/Users/loginUser.js";
import addPayrollListsRouter from "./src/routes/Payroll/createPayroll.js";
import payrollListsRouter from "./src/routes/Payroll/payrollLists.js";
import deletePayrollRouter from "./src/routes/Payroll/deletePayroll.js";
import editPayrollRouter from "./src/routes/Payroll/editPayroll.js";
import getPayrollContentRouter from "./src/routes/Payroll/PayrollContentOnly.js";
import showJobPositions from "./src/routes/Payroll/JobPosition/showJobPositions.js";
import addJobpPositionRouter from "./src/routes/Payroll/JobPosition/addJobPosition.js";
import deleteJobPositionRouter from "./src/routes/Payroll/JobPosition/deleteJobPositions.js";
import editJobPositionRouter from "./src/routes/Payroll/JobPosition/editJobPosition.js";
import addPayrollEmployeesRouter from "./src/routes/Payroll/PayrollEmployees/addPayrollEmployees.js";
import showPayrollEmployeesRouter from "./src/routes/Payroll/PayrollEmployees/showPayrollEmployees.js";
import editPayrollEmployeeRouter from "./src/routes/Payroll/PayrollEmployees/editPayrollEmployees.js";
import deletePayrollEmployeeRouter from "./src/routes/Payroll/PayrollEmployees/deletePayrollEmployee.js";
import viewPayrollProfileRouter from "./src/routes/Payroll/ViewPayrollProfile/getUserProfile.js";
import generateTokenRouter from "./src/routes/Payroll/ViewPayrollProfile/generateToken.js";
import { initializeDatabase } from "./src/config/initializeDatabase.js"; // Adjust the path accordingly
import cors from "cors";

const { json } = pkg;
config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "payrollmanagementsystem.up.railway.app",
      "https://payrollmanagementsystem.up.railway.app",
      "payrollmanagementsystem.up.railway.app:8080",
    ],

    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
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

    // Payroll Employees

    app.use("/api/add-payroll-employees", addPayrollEmployeesRouter);
    app.use("/api/show-payroll-employees", showPayrollEmployeesRouter);
    app.use("/api/edit-payroll-employee", editPayrollEmployeeRouter);
    app.use("/api/delete-payroll-employee", deletePayrollEmployeeRouter);

    // Job Positions
    app.use("/api/job-positions", showJobPositions);
    app.use("/api/add-job-positions", addJobpPositionRouter);
    app.use("/api/delete-job-positions", deleteJobPositionRouter);
    app.use("/api/edit-job-positions", editJobPositionRouter);

    // ViewPayrollProfile

    app.use("/api/generate-share-token", generateTokenRouter);
    app.use("/api/view-payroll-profile", viewPayrollProfileRouter);

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
