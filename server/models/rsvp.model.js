const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

export const rsvpSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
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
    enum: ["going", "not going", "interested"],
    default: "interested",
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

export const RSVPModel = mongoose.model("RSVP", rsvpSchema);
