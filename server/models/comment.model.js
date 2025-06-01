import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const commentSchema = new mongoose.Schema(
  {
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
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export const CommentModel = mongoose.model("Comment", commentSchema);
