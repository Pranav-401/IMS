import pool from "../config/db.js";
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing

// Helper function to hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Helper function to compare password
const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export const getAllUsersService = async () => {
  const result = await pool.query("SELECT * FROM usersRole");
  return result.rows;
};

<<<<<<< HEAD
// Original loginId parameter name was loginId, but query used id. Changed query to use loginId.
export const getUserByIdService = async (loginId) => {
=======
export const getUserByIdService = async (loginId) => {
  // CORRECTED: Select where loginId matches the input
>>>>>>> 1bfd937381443dbb3e0bb4675b72e5153fe1f0e0
  const result = await pool.query(
    "SELECT * FROM usersRole where loginId = $1",
    [loginId]
  );
  return result.rows[0];
};

<<<<<<< HEAD
// HASHING PASSWORD before creation
=======
>>>>>>> 1bfd937381443dbb3e0bb4675b72e5153fe1f0e0
export const createUserService = async (loginId, role, email, password) => {
  const hashedPassword = await hashPassword(password);
  const result = await pool.query(
    "INSERT INTO usersRole (loginId, role, email, password) VALUES ($1,$2,$3,$4) RETURNING *",
    [loginId, role, email, hashedPassword] // Store hashed password
  );
  // Return the user object WITHOUT the password
  const { password: _, ...userWithoutPassword } = result.rows[0];
  return userWithoutPassword;
};

<<<<<<< HEAD
// New Service for Login
export const loginUserService = async (loginId, password) => {
  // 1. Fetch user by loginId
  const result = await pool.query(
    "SELECT * FROM usersRole WHERE loginId = $1",
    [loginId]
=======
export const updatePasswordService = async (loginId, newPassword) => {
  // Renamed internally for clarity
  // CORRECTED: Update usersRole table and use loginId as condition
  const result = await pool.query(
    "UPDATE usersRole SET password=$1 where loginId=$2 RETURNING loginId, email", // Return non-sensitive data
    [newPassword, loginId]
>>>>>>> 1bfd937381443dbb3e0bb4675b72e5153fe1f0e0
  );
  const user = result.rows[0];

  if (!user) {
    return null; // User not found
  }

  // 2. Compare the provided password with the stored hashed password
  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    return null; // Password mismatch
  }

  // 3. Login successful: return user data without the password hash
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Updating password service
export const updatePasswordService = async (loginId, newPassword) => {
  const hashedPassword = await hashPassword(newPassword);
  // NOTE: Changed "users" table name to "usersRole" to match your schema
  const result = await pool.query(
    "UPDATE usersRole SET password=$1 where loginId=$2 RETURNING *",
    [hashedPassword, loginId]
  );

  const updatedUser = result.rows[0];
  if (!updatedUser) return null;

  // Return the updated user object WITHOUT the password
  const { password: _, ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
};
