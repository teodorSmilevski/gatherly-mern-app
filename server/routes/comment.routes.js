import express from "express";
import {
  createComment,
  getCommentsByEvent,
  deleteComment,
} from "../controllers/comment.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Comments
 *     description: Comment management endpoints
 */

/**
 * @swagger
 * /api/comments/new:
 *   post:
 *     summary: Add a comment to an event
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentCreate'
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: "Bad request (missing fields)"
 *       401:
 *         description: "Unauthorized: user not found"
 *       500:
 *         description: "Server error"
 */
router.post("/new", authenticate, createComment);

/**
 * @swagger
 * /api/comments/{eventId}:
 *   get:
 *     summary: Get all comments for an event
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID to fetch comments for
 *     responses:
 *       200:
 *         description: List of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Server error fetching comments
 */
router.get("/:eventId", getCommentsByEvent);

/**
 * @swagger
 * /api/comments/{commentId}:
 *   delete:
 *     summary: Delete a specific comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID to delete
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error deleting comment
 */
router.delete("/:commentId", deleteComment);

export default router;
