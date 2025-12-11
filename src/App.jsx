import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import BoardPage from "./pages/BoardPage/BoardPage";
import Signup from "./pages/SignUp/Signup";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import FrontPage from "./pages/frontPage/FrontPage";
import Login from "./pages/LoginPage/Login";
import Footer from "./components/footer/Footer";

const App = () => {
  // const location = useLocation();
  // const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="app-container">
      {/* {!hideNavbar && <Navbar />} */}
             
      {/* <div className={!hideNavbar ? "content-wrapper" : ""}> */}
           <div className="content-wrapper"> 
        <main className="main-container">
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/board/:id" element={<BoardPage />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;
