const express = require("express");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const {
  createCoupon,
  updateCoupon,
  getCoupon,
  getallCoupons,
  deleteCoupon,
} = require("../controller/couponControl");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCoupon);
router.put("/:id", authMiddleware, isAdmin, updateCoupon);
router.get("/:id", getCoupon);
router.get("/", getallCoupons);
router.delete("/:id", authMiddleware, isAdmin, deleteCoupon);

module.exports = router;
