import {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  updatePassword,
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
    next(error);
  }
};
export const getAllUsers = async (req, res, next) => {
  try {
    const user = await getAllUsersService();
    handleResponse(res, 200, "User fetched Successfully", user);
  } catch (error) {
    next(error);
  }
};
export const getUsersById = async (req, res, next) => {
  const { loginId } = req.body;
  try {
    const user = await getUserByIdService(loginId);
    if (!user) return handleResponse(res, 404, "User Not Found");
    handleResponse(res, 200, "User fetched Successfully", user);
  } catch (error) {
    next(error);
  }
};
export const updatePassword = async (req, res, next) => {
  const { loginId, password } = req.body;
  try {
    const updatePassword = await updatePassword(loginId, password);
    handleResponse(res, 200, "User UPDATED Successfully", updatePassword);
  } catch (error) {
    next(error);
  }
};
