import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createBlog, updateBlog } from "../../apis/blog"; // Directly import API functions
import styles from "./BlogForm.module.css";
import cross from "../../assets/cross.png";
import { useBlog } from "../../context/BlogContext";

export default function BlogForm({ blog, onClose }) {
  const [blogs, setBlogs] = useState([{ title: "", content: "" }]);
  const { refetchBlogs, loading } = useBlog(); 

  useEffect(() => {
    if (blog) {
      // Pre-fill form fields when editing
      setBlogs([{
        title: blog.title || "",
        content: blog.content || ""
      }]);
    }
  }, [blog]);

  const validate = () => {
    let isValid = true;
    blogs.forEach((blog) => {
      if (!blog.title.trim()) {
        toast.error("Title is required");
        isValid = false;
      }
      if (!blog.content.trim()) {
        toast.error("Content is required");
        isValid = false;
      }
    });
    return isValid;
  };

  const handleChange = (index, field, value) => {
    const updatedBlogs = [...blogs];
    updatedBlogs[index] = {
      ...updatedBlogs[index],
      [field]: value,
    };
    setBlogs(updatedBlogs);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      const userId = localStorage.getItem("userId");
      const blogData = {
        userId,
        blogs,
      };

      try {
        let result;
        if (blog) {
          // Update existing blog
          result = await updateBlog(blog.parentId, {
            ...blog,
            blogs
          });
        } else {
          // Create new blog
          result = await createBlog(blogData);
        }

        if (result.status === "success") {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }

        onClose();
        refetchBlogs(); 
      } catch (error) {
        toast.error("Failed to submit blog.");
      }
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.formContainer}>
        <img
          src={cross}
          alt="Close"
          className={styles.closeIcon}
          onClick={onClose}
        />
        <h2>{blog ? "Edit Blog" : "Create Blog"}</h2>
        <form onSubmit={handleSubmit}>
          {blogs.map((blog, index) => (
            <div key={index} className={styles.blogSection}>
              <div className={styles.inputGroup}>
                <label htmlFor={`title-${index}`}>Title</label>
                <input
                  type="text"
                  id={`title-${index}`}
                  name={`title-${index}`}
                  placeholder="Enter the blog title"
                  value={blog.title}
                  onChange={(e) => handleChange(index, "title", e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor={`content-${index}`}>Content</label>
                <textarea
                  id={`content-${index}`}
                  name={`content-${index}`}
                  placeholder="Write your blog content here..."
                  value={blog.content}
                  onChange={(e) => handleChange(index, "content", e.target.value)}
                  className={styles.textarea}
                />
              </div>
            </div>
          ))}
          <div className={styles.button}>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Submitting..." : blog ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


