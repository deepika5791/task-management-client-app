import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="footer">
        <h1>
          Task<span style={{ color: "#6c63ff" }}>Flow</span>
        </h1>
        <p>
          Organize your tasks, track progress, and boost productivity — all in
          one place.
        </p>
        <p>© 2025 TaskFlow. All rights reserved.</p>
        <div className="social-icons">
          Follow Us
          <a href="#">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
