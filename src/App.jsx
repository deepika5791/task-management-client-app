import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/LoginPage/Login";
import Home from "./pages/Home/Home";
import BoardPage from "./pages/BoardPage/BoardPage";
import Signup from "./pages/SignUp/Signup";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

const App = () => {
  const location = useLocation();
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) document.documentElement.classList.add("dark-mode");
    else document.documentElement.classList.remove("dark-mode");
  }, [darkMode]);

  return (
    <div className="app-container">
      {!hideNavbar && <Navbar />}
      <button
        className="mode-toggler-btn"
        onClick={() => setDarkMode((prev) => !prev)}
      >
        {darkMode ? (
          <>
            <i class="bi bi-moon-fill">Light Mode</i>
          </>
        ) : (
          <>
            <i class="bi bi-brightness-low-fill">Dark Mode</i>
          </>
        )}
      </button>

      <div className={!hideNavbar ? "content-wrapper" : ""}>
        <main className="main-container">
          <Routes>
            <Route path="/" element={<Navigate to="/signup" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/board/:id" element={<BoardPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
