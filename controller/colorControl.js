const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongoId");
const Color = require("../models/colorModel");

//creating a Color
const createColor = asyncHandler(async (req, res) => {
  try {
    const newColor = await Color.create(req.body);
    res.json(newColor);
  } catch (e) {
    throw new Error(e);
  }
});

//updating the Color
const updateColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updatedColor = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedColor);
  } catch (e) {
    throw new Error(e);
  }
});

//get a single Color
const getColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const findColor = await Color.findById(id);
    res.json(findColor);
  } catch (e) {
    throw new Error(e);
  }
});

//get all Colors
const getallColors = asyncHandler(async (req, res) => {
  try {
    const getColors = await Color.find();
    res.json(getColors);
  } catch (e) {
    throw new Error(e);
  }
});

//delete the Color
const deleteColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletedColor = await Color.findByIdAndDelete(id);
    res.json(deletedColor);
  } catch (e) {
    throw new Error(e);
  }
});

module.exports = {
  createColor,
  updateColor,
  getColor,
  getallColors,
  deleteColor,
};
