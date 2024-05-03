const { generateToken } = require("../config/jwToken");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");
const uniqid = require("uniqid");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongoId");

const userCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  const { cart } = req.body;
  try {
    const user = await User.findById(_id);
    let products = [];
    // Check if product already in cart
    const alreadyInCart = await Cart.findOne({ user: user._id });
    if (alreadyInCart) {
      alreadyInCart.remove();
    }
    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.color = cart[i].color;
      // Get product price
      let getPrice = await Product.findById(cart[i]._id).select("price").exec();
      object.price = getPrice.price;
      products.push(object);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }
    const newCart = await new Cart({
      user: user._id, // Set user field
      products,
      cartTotal,
      orderBy: user?._id,
    }).save();
    res.json(newCart);
  } catch (e) {
    throw new Error(e);
  }
});

//get a user cart
const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const user = await User.findById(_id);
    const cart = await Cart.findOne({ orderBy: user._id }).populate(
      "products.product"
    );
    res.json(cart);
  } catch (e) {
    throw new Error(e);
  }
});

//get all Carts
const getallCarts = asyncHandler(async (req, res) => {
  try {
    const cart = await Cart.find();
    res.json(cart);
  } catch (e) {
    throw new Error(e);
  }
});

//delete the Cart
const deleteCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const user = await User.findById(_id);
    const deletedCart = await Cart.findOneAndDelete({ orderBy: user._id });
    res.json(deletedCart);
  } catch (e) {
    throw new Error(e);
  }
});

module.exports = { userCart, getUserCart, getallCarts, deleteCart };
