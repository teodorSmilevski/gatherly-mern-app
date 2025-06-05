import express from "express";
import {
  createRSVP,
  getRSVPSsByUser,
  getRSVPsByEvent,
  deleteRSVP,
} from "../controllers/rsvp.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: RSVPs
 *     description: RSVP management endpoints
 */

/**
 * @swagger
 * /api/rsvps/new:
 *   post:
 *     summary: Create a new RSVP for an event
 *     tags: [RSVPs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RSVPCreate'
 *     responses:
 *       201:
 *         description: RSVP created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RSVP'
 *       400:
 *         description: Reservation already exists for this user and event
 *       500:
 *         description: Server error
 */
router.post("/new", authenticate, createRSVP);

/**
 * @swagger
 * /api/rsvps/{eventId}:
 *   get:
 *     summary: Get RSVPs for a specific event
 *     tags: [RSVPs]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID
 *     responses:
 *       200:
 *         description: List of RSVPs for event
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RSVP'
 *       500:
 *         description: Server error
 */
router.get("/:eventId", getRSVPsByEvent);

/**
 * @swagger
 * /api/rsvps/user/{userId}:
 *   get:
 *     summary: Get RSVPs for a specific user
 *     tags: [RSVPs]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: List of RSVPs for user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RSVP'
 *       500:
 *         description: Server error
 */
router.get("/user/:userId", getRSVPSsByUser);

/**
 * @swagger
 * /api/rsvps/{rsvpId}:
 *   delete:
 *     summary: Delete a specific RSVP
 *     tags: [RSVPs]
 *     parameters:
 *       - in: path
 *         name: rsvpId
 *         required: true
 *         schema:
 *           type: string
 *         description: The RSVP ID
 *     responses:
 *       200:
 *         description: RSVP deleted successfully
 *       404:
 *         description: RSVP not found
 *       500:
 *         description: Server error deleting RSVP
 */
router.delete("/:rsvpId", deleteRSVP);

export default router;
