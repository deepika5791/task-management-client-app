import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import WorkList from "../../assets/task-list.svg";
import "./FrontPage.css";

const FrontPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  // const handleGetStarted = () => {
  //   if (user) {
  //     navigate("/home");
  //   } else {
  //     setError("You are not logged in. Please login or signup first.");
  //   }
  // };

   const handleGetStarted = () => {
    navigate("/globalLoginPage")
   }

  return (
    <div className="home-hero">
      <div className="hero-left">
        <h1>Organize your tasks effortlessly</h1>
        <p className="subtitle">
          Manage tasks, track progress, and boost your productivity — all in one
          place.
        </p>

        <button className="get-started" onClick={handleGetStarted}>
          Get Started
        </button>
        {error && (
          <p
            style={{
              marginTop: "10px",
              color: "#d9534f",
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            {error}
          </p>
        )}
      </div>

      <div className="hero-right">
        <img
          src={WorkList}
          alt="Task Management Illustration"
          className="hero-image"
        />
      </div>
    </div>
  );
};

export default FrontPage;
