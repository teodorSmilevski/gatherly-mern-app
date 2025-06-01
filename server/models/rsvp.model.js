import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const rsvpSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    default: () => uuidv4(),
  },
  eventId: {
    type: String,
    ref: "Event",
    required: true,
    index: true,
  },
  userId: {
    type: String,
    ref: "User",
    required: true,
    index: true,
  },
  status: {
    type: String,
    enum: ["Going", "Interested"],
    default: "Going",
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

export const RSVPModel = mongoose.model("RSVP", rsvpSchema);
