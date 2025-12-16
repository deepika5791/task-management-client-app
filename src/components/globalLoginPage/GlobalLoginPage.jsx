import React from "react";
import "./GlobalLoginPage.css";
import { NavLink } from "react-router-dom";

const GlobalLoginPage = () => {
  return (
    <>
      <div>
        <div className="not-logged-page">
          <div className="not-logged-box">
            <h2>You are not logged in</h2>
            <p>Please log in to access this page.</p>

            <NavLink to="/login">
              <button className="login-btn">Go to Login</button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
export default GlobalLoginPage;
