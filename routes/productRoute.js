const express = require("express");
const {
  createProduct,
  getProduct,
  getallProducts,
  updateProduct,
  deleteProduct,
  productRatings,
  uploadImages,
  deleteImages,
} = require("../controller/productControl");
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const {
  uploadPhoto,
  productImgResize,
} = require("../middlewares/uploadImages");

router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/:id", getProduct);
router.put("/rating", authMiddleware, productRatings);
router.put(
  "/upload/",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.delete("/delete-image/:id", authMiddleware, isAdmin, deleteImages);
router.get("/", getallProducts);

module.exports = router;
