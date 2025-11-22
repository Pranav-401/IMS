// routes/userRouter.js - MODIFIED

import express from "express";
import {
  createUser,
  loginUser, // 👈 Import the new login controller
  getAllUsers,
  getUsersById,
  updatePassword,
} from "../controller/userController.js";

const router = express.Router();

router.post("/user", createUser); // Register a new user
router.post("/login", loginUser); // 👈 NEW LOGIN ROUTE: POST to /api/login
router.get("/user", getAllUsers);
router.get("/user/:loginId", getUsersById);
router.put("/user/:loginId", updatePassword);

export default router;
