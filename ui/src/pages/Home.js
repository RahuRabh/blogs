import React from "react";
import HomePage from "../components/HomePage/HomePage";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.mainContent}>
        <HomePage />
      </main>
      <Footer />
    </div>
  );
}
