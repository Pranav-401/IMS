import {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  updatePasswordService, // Renamed model function for clarity
  loginUserService, // New import
} from "../model/userModel.js";

//Standardized response function
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createUser = async (req, res, next) => {
  const { loginId, role, email, password } = req.body;
  try {
    const newUser = await createUserService(loginId, role, email, password);
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
    handleResponse(res, 200, "User fetched Successfully", user);
  } catch (error) {
    next(error);
  }
};

// Renamed and corrected: updatePassword -> updateUserPassword, uses req.params.id and req.body.password
export const updateUserPassword = async (req, res, next) => {
  const loginId = req.params.id; // Get loginId from URL parameter
  const { password } = req.body; // Get new password from body
  try {
    // NOTE: Using the renamed service function
    const updatedUser = await updatePasswordService(loginId, password);

    if (!updatedUser) return handleResponse(res, 404, "User Not Found");

    handleResponse(res, 200, "Password UPDATED Successfully", updatedUser);
  } catch (error) {
    next(error);
  }
};
