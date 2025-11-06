import React from "react";
import { useNavigate } from "react-router-dom";
import  WorkList  from "../../assets/task-list.svg";
import "./FrontPage.css";

const FrontPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup");
  };

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
