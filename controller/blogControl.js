const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongoId");
const { cloudinaryUploadImg } = require("../utils/cloudinary");
const fs = require("fs");
const { loginUserCtrl } = require("./userControl");

//creating new blog
const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json(newBlog);
  } catch (e) {
    throw new Error(e);
  }
});

//updating the blog
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedBlog);
  } catch (e) {
    throw new Error(e);
  }
});

//get a single Blog
const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const findBlog = await Blog.findById(id)
      .populate("likes")
      .populate("dislikes");
    await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );
    res.json(findBlog);
  } catch (e) {
    throw new Error(e);
  }
});

//get all blogs
const getallBlogs = asyncHandler(async (req, res) => {
  try {
    const getBlogs = await Blog.find();
    res.json(getBlogs);
  } catch (e) {
    throw new Error(e);
  }
});

//delete the blog
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    res.json(deletedBlog);
  } catch (e) {
    throw new Error(e);
  }
});

//likes
const likeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongodbId(blogId);
  //find blog to like
  const blog = await Blog.findById(blogId);
  //find user login
  const userLoginId = req?.user?._id;
  //find if blog is liked
  const isLiked = blog?.isLiked;
  //find if blog is disliked
  const dislikedBlog = blog?.dislikes?.find(
    (userId) => userId?.toString() === userLoginId?.toString()
  );
  if (dislikedBlog) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: userLoginId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: userLoginId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: userLoginId },
        isLiked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});

//dislikes
const dislikeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongodbId(blogId);
  //find blog to dislike
  const blog = await Blog.findById(blogId);
  //find user login
  const userLoginId = req?.user?._id;
  //find if blog is disliked
  const isDisliked = blog?.isDisliked;
  //find if blog is liked
  const likedBlog = blog?.likes?.find(
    (userId) => userId?.toString() === userLoginId?.toString()
  );
  if (likedBlog) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: userLoginId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else if (isDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: userLoginId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: userLoginId },
        isDisliked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});

//upload images
const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
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
    const findBlog = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      { new: true }
    );
    res.json(findBlog);
  } catch (e) {
    throw new Error(e);
  }
});

module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  getallBlogs,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  uploadImages,
};
