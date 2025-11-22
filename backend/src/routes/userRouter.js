import express from "express";
import {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  updatePassword,
} from "../model/userModel.js";

const router = express.Router();

router.post("/user", createUserService);
router.get("/user", getAllUsersService);
router.get("/user/:id", getUserByIdService);
router.put("/user/:id", updatePassword);

export default router;
