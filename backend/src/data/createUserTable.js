import pool from "../config/db.js";

const createUserRoleTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS usersRole (
  loginId VARCHAR(50) PRIMARY KEY,
  role VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
); `;
  try {
    await pool.query(queryText);
    console.log("User Role table created if not exist ");
  } catch (error) {
    console.log("Error while creating user Role table : ", error);
  }
};

export default createUserRoleTable;
