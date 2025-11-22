import pool from "../config/db.js";

export const getAllUsersService = async () => {
  const result = await pool.query("SELECT * FROM usersRole");
  return result.rows;
};

export const getUserByIdService = async (loginId) => {
  // CORRECTED: Select where loginId matches the input
  const result = await pool.query(
    "SELECT * FROM usersRole where loginId = $1",
    [loginId]
  );
  return result.rows[0];
};

export const createUserService = async (loginId, role, email, password) => {
  const result = await pool.query(
    "INSERT INTO usersRole (loginId, role, email, password) VALUES ($1,$2,$3,$4) RETURNING *",
    [loginId, role, email, password]
  );
  return result.rows[0];
};

export const updatePasswordService = async (loginId, newPassword) => {
  // Renamed internally for clarity
  // CORRECTED: Update usersRole table and use loginId as condition
  const result = await pool.query(
    "UPDATE usersRole SET password=$1 where loginId=$2 RETURNING loginId, email", // Return non-sensitive data
    [newPassword, loginId]
  );
  return result.rows[0];
};
