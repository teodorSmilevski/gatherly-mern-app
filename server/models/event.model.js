import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const eventSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      default: () => uuidv4(),
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    creatorId: {
      type: String,
      ref: "User",
      required: true,
      index: true,
    },
    categoryId: {
      type: String,
      required: true,
      ref: "Category",
    },
    maxCapacity: {
      type: Number,
    },
    comments: [
      {
        type: String,
        ref: "Comment",
      },
    ],
    rsvps: [
      {
        type: String,
        ref: "RSVP",
      },
    ],
  },
  { timestamps: true }
);

export const EventModel = mongoose.model("Event", eventSchema);
