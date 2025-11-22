import express from "express";
import {
  createUser,
  loginUser,
  getAllUsers,
  getUsersById,
  updatePassword,
} from "../controller/userController.js";

const router = express.Router();

router.post("/user", createUser); // Register a new user
router.post("/login", loginUser); // Handle user login
router.get("/user", getAllUsers);
router.get("/user/:id", getUsersById); // Using ':id' to match controller logic
router.put("/user/:id", updatePassword); // Using ':id' to match controller logic

export default router;
