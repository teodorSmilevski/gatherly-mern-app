import { CategoryModel } from "../models/category.model.js";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const existingCategory = await CategoryModel.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists!" });
    }

    const newCategory = await CategoryModel.create({ name });

    res.status(201).json({ category: newCategory });
  } catch (error) {
    res.status(500).json({ message: "Error creating category!", error });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find().lean();

    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories!", error });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.body.categoryId;

    const category = await CategoryModel.findById(categoryId).lean();
    if (!category) {
      return res.status(404).json({ message: "Category not found!" });
    }

    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ message: "Error fetching category!", error });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const categoryId = req.body.categoryId;
    const { name } = req.body;

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true }
    ).lean();

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found!" });
    }

    res.status(200).json({ category: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: "Error updating category!", error });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const deletedCategory = await CategoryModel.findByIdAndDelete(
      categoryId
    ).lean();

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found!" });
    }

    res.status(200).json({ message: "Category deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category!", error });
  }
};
