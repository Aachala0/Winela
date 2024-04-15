var express = require("express");
var router = express.Router();

const { verifyPayment } = require("./esewa");
const { getOrderForPayment } = require("../controller/userControl");
const { createPayment } = require("../controller/paymentCtrl");

router.post(
  "/verify-payment",
  verifyPayment,
  getOrderForPayment,
  createPayment
);

module.exports = router;
