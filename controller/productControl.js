const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const slugify = require("slugify");
const validateMongodbId = require("../utils/validateMongoId");
const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");
const fs = require("fs");

const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (e) {
    throw new Error(e);
  }
});

//get all Products
const getallProducts = asyncHandler(async (req, res) => {
  try {
    //filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let qryString = JSON.stringify(queryObj);
    qryString = qryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    let query = Product.find(JSON.parse(qryString));

    //sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    //limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    //pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("Page does not exist!");
    }

    const product = await query;
    res.json(product);
  } catch (e) {
    throw new Error(e);
  }
});

//get a single Product
const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const findProduct = await Product.findById(id);
    res.json(findProduct);
  } catch (e) {
    throw new Error(e);
  }
});

//Update a product
const updateProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    throw new Error(error);
  }
});

//delete a product
const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const deletedProduct = await Product.findOneAndDelete(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    res.json(deletedProduct);
  } catch (error) {
    throw new Error(error);
  }
});

//product ratings
const productRatings = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, productId } = req.body;
  try {
    const product = await Product.findById(productId);
    let ratedProduct = await product.ratings.find(
      (userId) => userId.postedBy.toString() === _id.toString()
    );
    if (ratedProduct) {
      ratedProduct.star = star;
      ratedProduct.comment = comment;
      await product.save();
    } else {
      product.ratings.push({ star, comment, postedBy: _id });
      await product.save();
    }
    //total ratings
    const getallRatings = await Product.findById(productId);
    const totalRating = getallRatings.ratings.length;
    const ratingSum = getallRatings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingSum / totalRating);
    let finalRating = await Product.findByIdAndUpdate(
      productId,
      {
        totalRatings: actualRating,
      },
      { new: true }
    );
    res.json(finalRating);
  } catch (e) {
    throw new Error(e);
  }
});

//upload images
const uploadImages = asyncHandler(async (req, res) => {
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "image");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    const images = urls.map((file) => {
      return file;
    });
    res.json(images);
  } catch (e) {
    throw new Error(e);
  }
});

//delete images
const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = cloudinaryDeleteImg(id, "image");
    res.json({ message: "Image deleted!" });
  } catch (e) {
    throw new Error(e);
  }
});

module.exports = {
  createProduct,
  getProduct,
  getallProducts,
  updateProduct,
  deleteProduct,
  productRatings,
  uploadImages,
  deleteImages,
};
