import React from "react";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import BlogPage from "../components/BlogPage/BlogPage";

import styles from "./page.module.css";

export default function Blog() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.mainContent}>
        <BlogPage />
      </main>
      <Footer />
    </div>
  );
}
