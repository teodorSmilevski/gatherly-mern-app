import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  deleteEvent,
} from "../controllers/event.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Events
 *     description: Event management endpoints
 */

/**
 * @swagger
 * /api/events/new:
 *   post:
 *     summary: Create a new event (creator only)
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventCreate'
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       403:
 *         description: Unauthorized: user is not a creator
 *       500:
 *         description: Server error
 */
router.post("/new", authenticate, createEvent);

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get a list of all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       500:
 *         description: Server error
 */
router.get("/", getAllEvents);

/**
 * @swagger
 * /api/events/{eventId}:
 *   get:
 *     summary: Get a specific event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID
 *     responses:
 *       200:
 *         description: Event details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       500:
 *         description: Server error
 */
router.get("/:eventId", getEventById);

/**
 * @swagger
 * /api/events/{eventId}:
 *   delete:
 *     summary: Delete an event (creator or admin)
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.delete("/:eventId", authenticate, deleteEvent);

export default router;
