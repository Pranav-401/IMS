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

// --- CRUD Operations ---

export const getAllUsersService = async () => {
  const result = await pool.query("SELECT * FROM usersRole");
  return result.rows;
};

export const getUserByIdService = async (loginId) => {
  const result = await pool.query(
    "SELECT * FROM usersRole where loginId = $1",
    [loginId]
  );
  return result.rows[0];
};

export const createUserService = async (
  loginId,
  role,
  email,
  hashedPassword
) => {
  // NOTE: Password should already be hashed in the controller before reaching here
  const result = await pool.query(
    "INSERT INTO usersRole (loginId, role, email, password) VALUES ($1,$2,$3,$4) RETURNING *",
    [loginId, role, email, hashedPassword]
  );
  // Return the user object WITHOUT the password
  const { password: _, ...userWithoutPassword } = result.rows[0];
  return userWithoutPassword;
};

// --- Authentication Operations ---

// Correct service for user login (checks credentials)
export const loginService = async (loginId, password) => {
  // 1. Get the user (including the stored hashed password)
  const result = await pool.query(
    "SELECT * FROM usersRole where loginId = $1",
    [loginId]
  );
  const user = result.rows[0];

  if (!user) {
    return null; // User not found
  }

  // 2. Compare the provided plain-text password with the stored hashed password
  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    return null; // Password mismatch
  }

  // 3. Login successful: return user data without the password hash
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Correct service for updating the password (hashes the new password before update)
export const updatePasswordService = async (loginId, newPassword) => {
  const hashedPassword = await hashPassword(newPassword);

  // Update the password in the usersRole table
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
