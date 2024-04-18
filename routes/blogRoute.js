const express = require("express");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const {
  createBlog,
  updateBlog,
  getBlog,
  getallBlogs,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  uploadImages,
} = require("../controller/blogControl");
const { uploadPhoto, blogImgResize } = require("../middlewares/uploadImages");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBlog);
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  blogImgResize,
  uploadImages
);
router.put("/likes", authMiddleware, likeBlog);
router.put("/dislikes", authMiddleware, dislikeBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.get("/:id", getBlog);
router.get("/", getallBlogs);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);

module.exports = router;