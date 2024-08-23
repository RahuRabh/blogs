// Footer.js
import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2024 Rahul Kumar</p>
      <div className={styles.socialLinks}>
        <p>
          Connect with me on{" "}
          <a
            href="https://www.linkedin.com/in/rahurabh/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/RahuRabh"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://instagram.com/ral.kum"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href="mailto:rahurabh@gmail.com"
          >
            Email
          </a>
        </p>
      </div>
      <div className={styles.resume}>
        <p>Ready to Work
          <a 
          href="https://rb.gy/81b7ua" 
          target="_blank"
          rel="noopener noreferrer"
          >Resume</a>
          </p>
      </div>
    </footer>
  );
}
