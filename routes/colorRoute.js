const express = require("express");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const {
  createColor,
  updateColor,
  getColor,
  getallColors,
  deleteColor,
} = require("../controller/colorControl");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createColor);
router.put("/:id", authMiddleware, isAdmin, updateColor);
router.get("/:id", getColor);
router.get("/", getallColors);
router.delete("/:id", authMiddleware, isAdmin, deleteColor);

module.exports = router;
