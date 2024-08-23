import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import AccountPage from "../components/AccountPage/AccountPage";

import styles from "./page.module.css";

export default function Account() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.mainContent}>
        <AccountPage />
      </main>
      <Footer />
    </div>
  );
}
