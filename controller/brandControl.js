const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongoId");
const Brand = require("../models/brandModel");

//creating a Brand
const createBrand = asyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.json(newBrand);
  } catch (e) {
    throw new Error(e);
  }
});

//updating the Brand
const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedBrand);
  } catch (e) {
    throw new Error(e);
  }
});

//get a single Brand
const getBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const findBrand = await Brand.findById(id);
    res.json(findBrand);
  } catch (e) {
    throw new Error(e);
  }
});

//get all Brands
const getallBrands = asyncHandler(async (req, res) => {
  try {
    const getBrands = await Brand.find();
    res.json(getBrands);
  } catch (e) {
    throw new Error(e);
  }
});

//delete the Brand
const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletedBrand = await Brand.findByIdAndDelete(id);
    res.json(deletedBrand);
  } catch (e) {
    throw new Error(e);
  }
});

module.exports = {
  createBrand,
  updateBrand,
  getBrand,
  getallBrands,
  deleteBrand,
};
