import pool from "../config/db.js";

export const getAllUsersService = async () => {
  const result = await pool.query("SELECT * FROM usersRole");
  return result.rows;
};
export const getUserByIdService = async (loginId) => {
  const result = await pool.query("SELECT * FROM usersRole where id = $1", [
    loginId,
  ]);
  return result.rows[0];
};
export const createUserService = async (loginId, role, email, password) => {
  const result = await pool.query(
    "INSERT INTO usersRole (loginId, role, email, password) VALUES ($1,$2,$3,$4) RETURNING *",
    [loginId, role, email, password]
  );
  return result.rows[0];
};
export const updatePassword = async (loginId, password) => {
  const result = await pool.query(
    "UPDATE users SET password=$1 where id=$2 RETURNING *",
    [password, loginId]
  );
  return result.rows[0];
};
