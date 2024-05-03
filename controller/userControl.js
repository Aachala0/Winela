const { generateToken } = require("../config/jwToken");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");
const uniqid = require("uniqid");
const asyncHandler = require("express-async-handler");
const { generateRefreshedToken } = require("../config/refreshToken");
const validateMongodbId = require("../utils/validateMongoId");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("./emailControl");

//create user
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    //Create new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    //User already exists
    throw new Error("User Already Exists!");
  }
});

//User Login
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check ig user exists
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshedToken(findUser?._id);
    const update_user = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      firstName: findUser?.firstName,
      lastName: findUser?.lastName,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials!");
  }
});

//Admin Login
const loginAdminCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check ig user exists
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== "admin")
    throw new Error("Not admin! Unauthorized user!");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshedToken(findAdmin?._id);
    const update_admin = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      firstName: findAdmin?.firstName,
      lastName: findAdmin?.lastName,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials!");
  }
});

//handle refresh Token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("Cookie unavailable!");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("No refresh token in database!");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("Error in refresh token!");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

//Logout
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("Cookie unavailable!");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); //forbidden
  }
  await User.findOneAndUpdate(
    { refreshToken: refreshToken }, // Filter object
    { refreshToken: "" }
  ); // Update object
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); //forbidden
});

//Update a user
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updateUser);
  } catch (e) {
    throw new Error(e);
  }
});

//save user address
const userAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const updatedAddress = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    res.json(updatedAddress);
  } catch (e) {
    throw new Error(e);
  }
});

//get all users
const getallUsers = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (e) {
    throw new Error(e);
  }
});

//get a single user
const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getUser = await User.findById(id);
    res.json(getUser);
  } catch (e) {
    throw new Error(e);
  }
});

//delete a single user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.json(deleteUser);
  } catch (e) {
    throw new Error(e);
  }
});

//block a single user
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User is blocked!",
    });
  } catch (e) {
    throw new Error(e);
  }
});

//unblock a single user
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User is unblocked!",
    });
  } catch (e) {
    throw new Error(e);
  }
});

//Update a Password
const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongodbId(_id);

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (password) {
      user.password = password;
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//forgot password
const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found!");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Click on the link to reset your password. Valid for 10 minutes. <a href='http://localhost:5000/api/user/reset-password/${token}'>Reset Password</a>`;
    const data = {
      to: email,
      subject: "Forgot Password Link",
      text: "Hey user!",
      htm: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (e) {
    throw new Error(e);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Token Expired!");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

//wishlist
const addToWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.body;
  try {
    const user = await User.findById(_id);
    const addedToWishlist = user.wishList.find(
      (id) => id.toString() === productId
    );
    if (addedToWishlist) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishList: productId },
        },
        { new: true }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishList: productId },
        },
        { new: true }
      );
      res.json(user);
    }
  } catch (e) {
    throw new Error(e);
  }
});

//get wishlist
const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const findUser = await User.findById(_id).populate({
      path: "wishList",
      select: "id title description category",
    });
    res.json(findUser);
  } catch (e) {
    throw new Error(e);
  }
});

//user cart
const userCarts = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  const { cart } = req.body;
  try {
    let products = [];
    const user = await User.findById(_id);
    //check if product already in cart
    const alreadyInCart = await Cart.findOne({ orderBy: user._id });
    if (alreadyInCart) {
      alreadyInCart.remove();
    }
    for (i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;

      let getPrice = await Product.findById(cart[i]._id).select("price").exec();
      object.price = getPrice.price;

      products.push(object);
    }
    let cartTotal = 0;
    for (i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }
    const newCart = await new Cart({
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

//empty cart
const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const user = await User.findOne(_id);
    const cart = await Cart.findOneAndDelete({ orderBy: user._id });
    res.json(cart);
  } catch (e) {
    throw new Error(e);
  }
});

//apply coupon
const applyCoupon = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  const { coupon } = req.body;
  try {
    const validCoupon = await Coupon.findOne({ name: coupon });
    if (validCoupon == null) {
      throw new Error("Invalid Coupon!");
    }
    const user = await User.findById(_id);
    const { products, cartTotal } = await Cart.findOne({
      orderBy: user._id,
    }).populate("products.product");
    let totalAfterDiscount = (
      cartTotal -
      (cartTotal * validCoupon.discount) / 100
    ).toFixed(2);
    await Cart.findOneAndUpdate(
      { orderBy: user._id },
      { totalAfterDiscount },
      { new: true }
    );
    res.json(`TotalAfterDiscount: ${totalAfterDiscount}`);
  } catch (e) {
    throw new Error(e);
  }
});

//creating a Order
const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  const { COD, couponApplied } = req.body;

  try {
    if (!COD) {
      throw new Error("Create cash order failed! COD is not set.");
    }

    const user = await User.findById(_id);
    let userCart = await Cart.findOneAndDelete({ orderBy: user._id });

    // Check if cart exists
    if (!userCart) {
      throw new Error("User's cart is empty or not found.");
    }

    let finalAmount = 0;
    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmount = userCart.totalAfterDiscount;
    } else {
      finalAmount = userCart.cartTotal;
    }

    // Create new order
    const newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmount,
        status: "Cash on Delivery",
        created: Date.now(),
        currency: "NRP",
      },
      orderBy: user._id,
      orderStatus: "Cash on Delivery",
    }).save();

    // Update product quantities and sold counts
    const update = userCart.products.map((item) => ({
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    }));
    const updatedProducts = await Product.bulkWrite(update, {});

    res.json({ message: "Order created successfully." });
  } catch (error) {
    throw new Error(error);
  }
});

//get Order
const getOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const findOrder = await Order.findOne({ orderBy: _id })
      .populate("products.product")
      .exec();
    res.json(findOrder);
  } catch (e) {
    throw new Error(e);
  }
});

//get all orders
const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const alluserorders = await Order.find()
      .populate("products.product")
      .populate("orderBy")
      .exec();
    res.json(alluserorders);
  } catch (error) {
    throw new Error(error);
  }
});

//get order by user id
const getOrderByUserId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const userorders = await Order.findOne({ orderBy: id })
      .populate("products.product")
      .populate("orderBy")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});
//update order status
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, payStatus } = req.body;
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updatedOrderStatus = await Order.findByIdAndUpdate(
      id,
      { orderStatus: status, paymentIntent: { status: payStatus } },
      { new: true }
    );
    res.json(updatedOrderStatus);
  } catch (e) {
    throw new Error(e);
  }
});

module.exports = {
  createUser,
  loginUserCtrl,
  getallUsers,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdminCtrl,
  addToWishlist,
  getWishlist,
  userAddress,
  userCarts,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrder,
  getAllOrders,
  getOrderByUserId,
  updateOrderStatus,
};
