const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

export const eventSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      unique: true,
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
    category: {
      type: String,
      required: true,
      ref: "Category",
    },
    maxCapacity: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const EventModel = mongoose.model("Event", eventSchema);
