const Coupon = require("../models/couponModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongoId");

//creating coupon
const createCoupon = asyncHandler(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.json(newCoupon);
  } catch (e) {
    throw new Error(e);
  }
});

//updating the Coupon
const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCoupon);
  } catch (e) {
    throw new Error(e);
  }
});

//get a single Coupon
const getCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const findCoupon = await Coupon.findById(id);
    res.json(findCoupon);
  } catch (e) {
    throw new Error(e);
  }
});

//get all Coupons
const getallCoupons = asyncHandler(async (req, res) => {
  try {
    const getCoupons = await Coupon.find();
    res.json(getCoupons);
  } catch (e) {
    throw new Error(e);
  }
});

//delete the Coupon
const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(id);
    res.json(deletedCoupon);
  } catch (e) {
    throw new Error(e);
  }
});

module.exports = {
  createCoupon,
  updateCoupon,
  getCoupon,
  getallCoupons,
  deleteCoupon,
};
