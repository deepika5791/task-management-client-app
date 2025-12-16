
import React, { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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

const App = () => {
  const location = useLocation();
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);
  const { user } = useContext(AuthContext);

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

            <Route
              path="/home"
              element={
                user ? (
                  <div className="content-wrap">
                    <Home />
                  </div>
                ) : (
                  <>
                    <div className="blur-background"></div>
                    <GlobalLoginPage />
                  </>
                )
              }
            />

            <Route
              path="/globalLoginPage"
              element={
                  user ? (
                  <div className="content-wrap">
                    <Home />
                  </div>
                ) : (
                <>
                  <div className="blur-background"></div>
                  <GlobalLoginPage />
                </>
             )
              }
            />

          </Routes>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default App;

