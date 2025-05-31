const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

export const commentSchema = new mongoose.Schema(
  {
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
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export const CommentModel = mongoose.model("Comment", commentSchema);
