import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-text">
          <h1>
            Task<span className="accent">Flow</span>
          </h1>
          <p>
            Organize your tasks, track progress, and boost productivity — all in
            one place.
          </p>
        </div>
        <div className="footer-bottom">
          <p>© 2025 TaskFlow. All rights reserved.</p>
          <div className="social-icons">
            <span>Follow Us</span>
            <FaFacebookF />
            <FaInstagram />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
