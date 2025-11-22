import express from "express";
import {
  createUser,
  getAllUsers,
  getUsersById,
  updateUserPassword, // Renamed controller function
  loginUser, // New import
} from "../controller/userController.js";

const router = express.Router();

router.post("/user", createUser);
router.post("/user/login", loginUser); // New login route
router.get("/user", getAllUsers);
router.get("/user/:id", getUsersById);
router.put("/user/:id", updateUserPassword); // Use the renamed controller

export default router;
