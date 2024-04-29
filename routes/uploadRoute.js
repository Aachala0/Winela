var express = require("express");
const { upload } = require("../config/fileconfig");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const { uploadFileResult } = require("../controller/uploadfileControl");
const { getUser } = require("../controller/userControl");
var router = express.Router();

router.param("userId", getUser);

//Post
router.post(
  "/:userId",
  authMiddleware,
  isAdmin,
  upload.single("file"),
  uploadFileResult
);

module.exports = router;
