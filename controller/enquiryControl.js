const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongoId");
const Enquiry = require("../models/enquiryModel");

//creating a Enquiry
const createEnquiry = asyncHandler(async (req, res) => {
  try {
    const newEnquiry = await Enquiry.create(req.body);
    res.json(newEnquiry);
  } catch (e) {
    throw new Error(e);
  }
});

//updating the Enquiry
const updateEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedEnquiry);
  } catch (e) {
    throw new Error(e);
  }
});

//get a single Enquiry
const getEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const findEnquiry = await Enquiry.findById(id);
    res.json(findEnquiry);
  } catch (e) {
    throw new Error(e);
  }
});

//get all Enquiry
const getallEnquiries = asyncHandler(async (req, res) => {
  try {
    const getEnquiries = await Enquiry.find();
    res.json(getEnquiries);
  } catch (e) {
    throw new Error(e);
  }
});

//delete the Enquiry
const deleteEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
    res.json(deletedEnquiry);
  } catch (e) {
    throw new Error(e);
  }
});

module.exports = {
  createEnquiry,
  updateEnquiry,
  getEnquiry,
  getallEnquiries,
  deleteEnquiry,
};
