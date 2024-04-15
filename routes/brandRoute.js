const express = require("express");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const {
  createBrand,
  updateBrand,
  getBrand,
  getallBrands,
  deleteBrand,
} = require("../controller/brandControl");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBrand);
router.put("/:id", authMiddleware, isAdmin, updateBrand);
router.get("/:id", getBrand);
router.get("/", getallBrands);
router.delete("/:id", authMiddleware, isAdmin, deleteBrand);

module.exports = router;
