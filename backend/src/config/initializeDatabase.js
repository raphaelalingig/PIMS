import { createConnection } from "mysql2/promise";

export async function initializeDatabase() {
  // Initial connection configuration without database and password
  const configWithoutDb = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
  };

  try {
    // Connect to MySQL without specifying a database
    const connection = await createConnection(configWithoutDb);

    // Create the database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS payroll_db`);
    console.log("Database 'payroll_db' checked/created");

    // Switch to the newly created database
    await connection.changeUser({ database: "payroll_db" });

    // Table creation queries
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
    ];

    // Execute table creation queries
    for (const query of tables) {
      await connection.query(query);
    }

    console.log("All tables created successfully!");
    await connection.end();
  } catch (error) {
    console.error("Error setting up the database:", error);
  }
}

// Initialize the database
initializeDatabase();
