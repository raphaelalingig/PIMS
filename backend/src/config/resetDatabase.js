// resetDatabase.js
import { createConnection } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

async function resetDatabase() {
  const config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "railway",
  };

  try {
    // Create connection
    const connection = await createConnection(config);
    console.log("Connected to database successfully");

    // Drop all existing tables in the correct order (respecting foreign key constraints)
    const dropTables = [
      "DROP TABLE IF EXISTS ShareToken",
      "DROP TABLE IF EXISTS PayrollEmployees",
      "DROP TABLE IF EXISTS JobPositions",
      "DROP TABLE IF EXISTS PayrollLists",
      "DROP TABLE IF EXISTS Users",
    ];

    console.log("Dropping existing tables...");
    for (const dropQuery of dropTables) {
      await connection.query(dropQuery);
      console.log(`Executed: ${dropQuery}`);
    }

    // Recreate tables
    const tables = [
      `CREATE TABLE IF NOT EXISTS Users (
        user_id INT PRIMARY KEY AUTO_INCREMENT,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        mobile_number VARCHAR(15),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(255),
        created_date DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS PayrollLists (
        payroll_list_id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES Users(user_id),
        list_name VARCHAR(100),
        description TEXT,
        created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        status INT DEFAULT 0
      )`,
      `CREATE TABLE IF NOT EXISTS JobPositions (
        job_position_id INT PRIMARY KEY AUTO_INCREMENT,
        payroll_list_id INT,
        title VARCHAR(100),
        salary DECIMAL(10, 2),
        FOREIGN KEY (payroll_list_id) REFERENCES PayrollLists(payroll_list_id) ON DELETE CASCADE,
        created_date DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS PayrollEmployees (
        employee_id INT PRIMARY KEY AUTO_INCREMENT,
        payroll_list_id INT,
        FOREIGN KEY (payroll_list_id) REFERENCES PayrollLists(payroll_list_id) ON DELETE CASCADE,
        employee_name VARCHAR(100),
        job_position VARCHAR(100),
        mobile_number VARCHAR(15),
        basic_pay DECIMAL(10, 2),
        salary_type INT,
        payment_status INT,
        overtime_status INT,
        overtime_hours INT,
        nightDifferential_status INT,
        nightDifferential_hours INT,
        deductions_status INT,
        deduction_reason VARCHAR(255),
        deductions_amount DECIMAL(10, 2),
        total_pay DECIMAL(10, 2),
        salary_date DATE,
        created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        job_position_id INT,
        FOREIGN KEY (job_position_id) REFERENCES JobPositions(job_position_id) ON DELETE CASCADE
      )`,
      `CREATE TABLE IF NOT EXISTS ShareToken (
        share_token_id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES Users(user_id),
        employee_id INT,
        FOREIGN KEY (employee_id) REFERENCES PayrollEmployees(employee_id) ON DELETE CASCADE,
        share_token VARCHAR(255),
        created_date DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
    ];

    console.log("Creating new tables...");
    for (const createQuery of tables) {
      await connection.query(createQuery);
      console.log(
        `Table created: ${createQuery
          .split("CREATE TABLE IF NOT EXISTS")[1]
          .split("(")[0]
          .trim()}`
      );
    }

    console.log("Database reset completed successfully!");
    await connection.end();
  } catch (error) {
    console.error("Error resetting database:", {
      message: error.message,
      code: error.code,
      errno: error.errno,
    });
    process.exit(1);
  }
}

// Execute if run directly
resetDatabase();
