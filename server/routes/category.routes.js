import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/new", createCategory);

router.get("/", getAllCategories);

router.get("/:categoryId", getCategoryById);

router.put("/update", updateCategory);

router.delete("/:categoryId", deleteCategory);

export default router;
