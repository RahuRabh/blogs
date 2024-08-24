const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog");

router.get("/getAllBlogs", blogController.getAllBlogs);

router.post("/createBlog", blogController.createBlog);

router.put("/updateBlog/:blogId", blogController.updateBlog);

router.delete("/deleteBlog/:blogId", blogController.deleteBlog);

module.exports = router;
