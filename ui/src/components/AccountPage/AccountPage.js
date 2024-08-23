import React, { useState } from "react";
import { useBlog } from "../../context/BlogContext";
import { deleteBlog } from "../../apis/blog"; // Directly import delete API function
import styles from "./AccountPage.module.css";
import BlogForm from "../BlogForm/BlogForm";
import edit from "../../assets/edit.png";
import del from "../../assets/del.png";
import { toast } from "react-toastify";

export default function AccountPage() {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("name");
  const { getBlogsByUserId, loading, refetchBlogs } = useBlog();

  const userBlogs = getBlogsByUserId(userId);

  const [isEditing, setIsEditing] = useState(false);
  const [updatedBlogData, setupdatedBlogData] = useState(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (userBlogs.length === 0) {
    return <p>You have not written any Blog.</p>;
  }

  const handleEdit = (blog) => {
    setupdatedBlogData(blog);
    setIsEditing(true);
  };

  const handleDelete = async (blogId) => {
    try {
      let result = await deleteBlog(blogId);
      if(result.status === "success"){
        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
      await refetchBlogs(); // Refetch blogs after deletion
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Error deleting blog. Please try again.");
    }
  };

  const handleCloseForm = () => {
    setIsEditing(false);
    setupdatedBlogData(null);
  };

  return (
    <div className={styles.accountPage}>
      <h2>{userName}'s Blogs</h2>
      {isEditing && <BlogForm blog={updatedBlogData} onClose={handleCloseForm} />}
      <div className={styles.blogGrid}>
        {userBlogs.map((blog) => (
          <div key={blog._id} className={styles.blogCard}>
            <div className={styles.iconContainer}>
              <img src={edit} alt="Edit" onClick={() => handleEdit(blog)} />
              <img src={del} alt="Delete" onClick={() => handleDelete(blog._id)} />
            </div>
            <h4>{blog.title}</h4>
            <p>{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
