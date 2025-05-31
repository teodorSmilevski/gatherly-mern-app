import express from "express";
import {
  getUserByUsername,
  getAllUsers,
  registerUser,
  loginUser,
} from "../controllers/user.controller.js";

const router = express.Router();

// POST register
router.post("/register", registerUser);

// POST login
router.post("/login", loginUser);

// GET all users
router.get("/", getAllUsers);

// GET user
router.get("/:username", getUserByUsername);

export default router;
