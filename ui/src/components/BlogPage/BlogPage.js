import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useBlog } from "../../context/BlogContext"
import styles from "./BlogPage.module.css"

export default function BlogPage() {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const { getBlogById } = useBlog();
  const blog = getBlogById(blogId);

  if (!blog) {
    return <p>Blog not found.</p>;
  }

  return (
    <div className={styles.blogPage}>
      <div className={styles.blogCard}>
        <h2>{blog.title}</h2>
        <p className={styles.content}>{blog.content}</p>
        {/* <p className={styles.author}>Author: </p> */}
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          Back
        </button>  
      </div>
    </div>
  )
}
