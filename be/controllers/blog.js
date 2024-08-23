const mongoose = require('mongoose')

const Blog = require("../models/blog");
// All Blogs Data
const getAllBlogs = async (req, res) => {
  try {
    const blog = await Blog.find();
    res.json(blog);
  } catch (error) {
    console.log(error);
  }
};

// Get Blog By User
const getBlogsByUser = async (req, res) => {
  try {
    const userData = await Blog.find(req.params);
    res.json(userData);
  } catch (error) {
    console.log(error);
  }
};

//update Blog
const updateBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { blogs } = req.body;

    // Ensure the blogs array is not empty
    if (!Array.isArray(blogs) || !blogs.length) {
      return res.status(400).json({ status: "error", message: "Blogs array cannot be empty." });
    }

    // Ensure the blogId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ status: "error", message: "Invalid blog ID." });
    }
    // Find the blog document by its ID
    const blogDocument = await Blog.findById(blogId);

    if (!blogDocument) {
      return res.status(404).json({ status: "error", message: "Blog not found 😥" });
    }

    // Update the blogs field
    blogDocument.blogs = blogs;

    // Save the updated document
    const updatedBlogDocument = await blogDocument.save();

    res.status(200).json({
      status: 'success',
      message: "Blog Updated 🥳",
      data: updatedBlogDocument
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error 😥" });
  }
};

//Create Blog
const createBlog = async (req, res) => {
  try {
    const { userId, blogs } = req.body;

    if (!userId) {
      return res.status(400).json({ status: "error", message: "User Id is required 🧐" });
    }
    if (!blogs) {
      return res.status(400).json({ status: "error",  message: "Blog Title and content both is required 🧐" });
    }

    const blogData = new Blog({ userId, blogs });
    const response = await blogData.save();

    res.status(200).json({
      status:"success",
      message: "Blog Created 🥳",
      blogs: response
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

//Delete Blog
const deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const response = await Blog.findOneAndDelete(blogId);
    if(response){
    res.status(200).json({status:'success', message: "Blog Deleted 😥"});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error 😥" });
  }
};

module.exports = {
  getAllBlogs,
  getBlogsByUser,
  createBlog,
  updateBlog,
  deleteBlog,
};
