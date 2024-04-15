const express = require("express");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const {
  createCategory,
  updateCategory,
  getCategory,
  getallCategories,
  deleteCategory,
} = require("../controller/blogCatCtrl");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.get("/:id", getCategory);
router.get("/", getallCategories);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);

module.exports = router;
