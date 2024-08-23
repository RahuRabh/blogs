import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Auth from "../Auth/Auth";
import BlogForm from "../BlogForm/BlogForm";

import styles from "./Header.module.css";

export default function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showBlogModal, setshowBlogModal] = useState(false);

  const handleCreateBlog = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      setshowBlogModal(true);
    }
  };

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.branding}>
          <h1>BLOG</h1>
        </div>
        <div className={styles.content}>
        <span className={styles.btn} onClick={() => navigate('/')}>Home</span>
          <span className={styles.btn} onClick={handleCreateBlog}>Create Blog</span>
          {isAuthenticated ? (
            <>
              <span className={styles.btn} onClick={() => navigate('/acount')}>Account</span>
              <span className={styles.btn} onClick={handleLogout}>Logout</span>
            </>
          ) : (
            <span className={styles.btn} onClick={() => setShowAuthModal(true)}>Login</span>
          )}
        </div>
      </header>
      {showAuthModal && <Auth onClose={() => setShowAuthModal(false)} />}
      {showBlogModal && <BlogForm onClose={() => setshowBlogModal(false)} />}
    </>
  );
}
