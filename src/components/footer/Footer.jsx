import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

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
            <NavLink to="https://www.linkedin.com/in/deepika-tripathi-5617562a1/">
              <i class="bi bi-linkedin"></i>
            </NavLink>

            <NavLink to="">
              <i class="bi bi-instagram"></i>
            </NavLink>

            <NavLink to="https://github.com/deepika5791?tab=repositories">
              <i class="bi bi-github"> </i>
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
