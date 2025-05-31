import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      default: () => uuidv4(),
    },
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "creator", "admin"],
      default: "user",
      required: true,
    },
    createdEvents: [
      {
        type: String,
        ref: "Event",
      },
    ],
    attendedEvents: [
      {
        type: String,
        ref: "Event",
      },
    ],
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);
