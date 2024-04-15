const express = require("express");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const {
  createEnquiry,
  updateEnquiry,
  getEnquiry,
  getallEnquiries,
  deleteEnquiry,
} = require("../controller/enquiryControl");
const router = express.Router();

router.post("/", createEnquiry);
router.put("/:id", authMiddleware, updateEnquiry);
router.get("/:id", getEnquiry);
router.get("/", getallEnquiries);
router.delete("/:id", authMiddleware, isAdmin, deleteEnquiry);

module.exports = router;
