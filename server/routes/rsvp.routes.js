import express from "express";
import {
  createRSVP,
  getRSVPSsByUser,
  getRSVPsByEvent,
  deleteRSVP,
} from "../controllers/rsvp.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/new", authenticate, createRSVP);

router.get("/:eventId", getRSVPsByEvent);

router.get("/user/:userId", getRSVPSsByUser);

router.delete("/:rsvpId", deleteRSVP);

export default router;
