var express = require("express");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const {
  userCart,
  getUserCart,
  getallCarts,
  deleteCart,
} = require("../controller/cartControl");
var router = express.Router();

router.post("/addToCart", authMiddleware, userCart);
router.get("/:id", authMiddleware, getUserCart);
router.get("/allCarts", authMiddleware, isAdmin, getallCarts);
router.delete("/delete-cart", authMiddleware, deleteCart);

module.exports = router;
