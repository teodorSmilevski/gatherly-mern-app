import express from "express";
import {
  getUserByUsername,
  getAllUsers,
  registerUser,
  loginUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/", getAllUsers);

router.get("/:username", getUserByUsername);

export default router;
