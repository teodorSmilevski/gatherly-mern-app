import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const categorySchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    default: () => uuidv4(),
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const CategoryModel = mongoose.model("Category", categorySchema);
