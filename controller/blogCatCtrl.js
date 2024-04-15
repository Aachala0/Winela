const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongoId");
const BlogCategory = require("../models/blogCatModel");

//creating a category
const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await BlogCategory.create(req.body);
    res.json(newCategory);
  } catch (e) {
    throw new Error(e);
  }
});

//updating the category
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updatedCategory = await BlogCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCategory);
  } catch (e) {
    throw new Error(e);
  }
});

//get a single Category
const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const findCategory = await BlogCategory.findById(id);
    res.json(findCategory);
  } catch (e) {
    throw new Error(e);
  }
});

//get all Categories
const getallCategories = asyncHandler(async (req, res) => {
  try {
    const getCategories = await BlogCategory.find();
    res.json(getCategories);
  } catch (e) {
    throw new Error(e);
  }
});

//delete the Category
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletedCategory = await BlogCategory.findByIdAndDelete(id);
    res.json(deletedCategory);
  } catch (e) {
    throw new Error(e);
  }
});

module.exports = {
  createCategory,
  updateCategory,
  getCategory,
  getallCategories,
  deleteCategory,
};
