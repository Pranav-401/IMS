import bcrypt from "bcryptjs"; // Used for password hashing and comparison
import {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  updatePasswordService,
} from "../model/userModel.js";

//Standardized response function
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

// ===================================================================
// USER REGISTRATION (Create User)
// ===================================================================
export const createUser = async (req, res, next) => {
  const { loginId, role, email, password } = req.body;

  try {
    // 1. Hash the password before storing it in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 2. Pass the hashed password to the service layer
    const newUser = await createUserService(
      loginId,
      role,
      email,
      hashedPassword
    );
    handleResponse(res, 201, "User created Successfully", newUser);
  } catch (error) {
    // Handle unique constraint violation (e.g., loginId or email already exists)
    if (error.code === "23505") {
      return handleResponse(
        res,
        409,
        "User with this login ID or email already exists"
      );
    }
    next(error);
  }
};

// ===================================================================
// USER LOGIN
// ===================================================================
export const loginUser = async (req, res, next) => {
  const { loginId, password } = req.body;

  try {
    // 1. Fetch user by loginId to get the stored hash
    const user = await getUserByIdService(loginId);

    if (!user) {
      return handleResponse(res, 404, "Invalid Credentials (User not found)");
    }

    // 2. Compare the plaintext password from the request with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return handleResponse(
        res,
        401,
        "Invalid Credentials (Password mismatch)"
      );
    }

    // 3. Login Successful: return non-sensitive user data
    const userData = {
      loginId: user.loginId,
      email: user.email,
      role: user.role,
    };

    handleResponse(res, 200, "Login Successful", userData);
  } catch (error) {
    next(error);
  }
};

// ===================================================================
// FETCH ALL USERS
// ===================================================================
export const getAllUsers = async (req, res, next) => {
  try {
    const user = await getAllUsersService();
    handleResponse(res, 200, "Users fetched successfully", user);
  } catch (error) {
    next(error);
  }
};

// ===================================================================
// FETCH USER BY ID
// ===================================================================
export const getUsersById = async (req, res, next) => {
  // Get loginId from URL parameters, not the body
  const { loginId } = req.params;
  try {
    const user = await getUserByIdService(loginId);
    if (!user) return handleResponse(res, 404, "User Not Found");
    handleResponse(res, 200, "User fetched successfully", user);
  } catch (error) {
    next(error);
  }
};

// ===================================================================
// UPDATE PASSWORD
// ===================================================================
export const updatePassword = async (req, res, next) => {
  const { loginId } = req.params; // Get ID from URL
  const { password: newPassword } = req.body; // Get new password from body

  try {
    // NOTE: You should also hash the newPassword here before calling the service!
    const updatedUser = await updatePasswordService(loginId, newPassword);

    if (!updatedUser) return handleResponse(res, 404, "User Not Found");
    handleResponse(res, 200, "Password UPDATED Successfully", updatedUser);
  } catch (error) {
    next(error);
  }
};
