import React from "react";
import { useNavigate } from "react-router-dom";
import { useBlog } from "../../context/BlogContext"
import Loader from "../Loader/Loader"
import styles from "./HomePage.module.css";

export default function HomePage() {
  const navigate = useNavigate()
  const { getAllBlogData, loading } = useBlog();
  const blogs = getAllBlogData();

  const truncateContent = (content) => {
    if (!content) return "";
    return content.length > 100 ? content.substring(0, 100) + "..." : content;
  };

  return (
    <div className={styles.homePage}>
      <h2>All Blogs</h2>
      {loading ? (
        <Loader />
      ) : (
      <div className={styles.blogGrid}>
        {blogs.map((blog) => (
          <div key={blog._id} className={styles.blogCard}>
            <h4>{blog.title}</h4>
            {/* <p className={styles.author}>Author: {blog.name}</p> */}
            <p>{truncateContent(blog.content)}</p>
            <p className={styles.readMore} onClick={() => navigate(`/blog/${blog._id}`)}>Read More...</p>
          </div>
        ))}
      </div>
    )}
    </div>
  );
}
