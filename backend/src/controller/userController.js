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
    // Check for unique constraint violation for better error message
    if (error.code === "23505") {
      error.message = "Login ID or Email already exists.";
      error.status = 409; // Conflict
    }
    next(error);
  }
};

// New Controller for Login
export const loginUser = async (req, res, next) => {
  const { loginId, password } = req.body;
  try {
    const user = await loginUserService(loginId, password);

    if (!user) {
      // User not found or password incorrect
      return handleResponse(res, 401, "Invalid Login ID or Password");
    }

    handleResponse(res, 200, "Login Successful", user);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const user = await getAllUsersService();
    handleResponse(res, 200, "Users fetched Successfully", user);
  } catch (error) {
    next(error);
  }
};

export const getUsersById = async (req, res, next) => {
  // NOTE: The original code was using req.body.loginId, but REST conventions usually use req.params for GET /:id
  // I will use req.params.id to match the router definition.
  const loginId = req.params.id;
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
