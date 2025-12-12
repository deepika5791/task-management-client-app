import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import BoardPage from "./pages/BoardPage/BoardPage";
import Signup from "./pages/SignUp/Signup";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import FrontPage from "./pages/frontPage/FrontPage";
import Login from "./pages/LoginPage/Login";
import Footer from "./components/footer/Footer";
import { AuthContext } from "./context/AuthProvider";
import GlobalLoginPage from "./components/globalLoginPage/GlobalLoginPage";
import { Outlet } from "react-router-dom";
const App = () => {
  const location = useLocation();
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);
  const { user } = useContext(AuthContext);

  const UserLayout = ({ user }) => (
    <div className={user ? "content-wrap" : "wrapper"}>
      <Outlet />
    </div>
  );

  return (
    <div className="app-container">
      <Navbar />
      <div className={!hideNavbar ? "content-wrapper" : ""}>
        <main className="main-container">
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/board/:id" element={<BoardPage />} />
            <Routes>
              <Route element={<UserLayout user={user} />}>
                {/* <Route
              path="/home"
              element={<div className={user ? "content-wrap" : "wrapper"}>{user ? <Home /> : <GlobalLoginPage />}</div>}
            />
            <Route path="/globalLoginPage" element={<div className={user ? "content-wrap" : "wrapper"}><GlobalLoginPage /></div> } /> */}
                <Route
                  path="/home"
                  element={user ? <Home /> : <GlobalLoginPage />}
                />
                <Route path="/globalLoginPage" element={<GlobalLoginPage />} />
              </Route>
            </Routes>
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;
