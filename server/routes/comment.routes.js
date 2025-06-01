import express from "express";
import {
  createComment,
  getCommentsByEvent,
  deleteComment,
} from "../controllers/comment.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/new", authenticate, createComment);

router.get("/:eventId", getCommentsByEvent);

router.delete("/:commentId", deleteComment);

export default router;
