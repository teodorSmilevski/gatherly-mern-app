import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  deleteEvent,
} from "../controllers/event.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/new", authenticate, createEvent);

router.get("/", getAllEvents);

router.get("/:eventId", getEventById);

router.delete("/:eventId", authenticate, deleteEvent);

export default router;
