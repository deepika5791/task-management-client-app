import React, {
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { AuthContext } from "../../context/AuthProvider";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);

  const handleLogout = () => {
    setOpenProfile(false);   
    logoutUser();
    navigate("/login");
  };


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="brand">
          <NavLink to="/">
            Task<span className="accent">Flow</span>
          </NavLink>
        </div>

        <nav className="workspace-switch">
          <NavLink
            to="/home"
            className="link"
            style={{ color: "white" }}
          >
            Boards
          </NavLink>
        </nav>
      </div>

      <div className="topbar-right">
        <div className="search-placeholder"></div>

        {user ? (
          <div className="profile-wrap" ref={profileRef}>
            <button
              className="profile-btn"
              onClick={() => setOpenProfile((s) => !s)}
              aria-expanded={openProfile}
            >
              <span className="avatar">
                {user.name?.[0]?.toUpperCase() || "U"}
              </span>
              <span className="username">
                Hi, {user.name}
              </span>
            </button>

            {openProfile && (
              <div className="profile-menu">
                <div className="menu-item">
                  <strong>{user.name}</strong>
                </div>

                <div className="menu-item small">
                  {user.email}
                </div>

                <div className="menu-divider" />

                <button
                  className="menu-item danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-links">
            <NavLink to="/login" className="link">
              Login
            </NavLink>
            <NavLink to="/signup" className="link primary">
              Signup
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
