import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import API from "../../api";
import { AuthContext } from "../../context/AuthProvider";
import "./Signup.css";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const handleform = async (e) => {
    e.preventDefault();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) {
    setError("Invalid email format");
    return;
  }
    try {
      const res = await API.post("/auth/signup", form);
      loginUser(res.data.user, res.data.token);
      navigate("/login");
    } catch (err) {
      setError("user already exist");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1>Task Manager</h1>
        <p>Create your account and start organizing your work.</p>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2>Create account</h2>
          <p className="muted">Start managing tasks — free and fast.</p>

          <form onSubmit={handleform} className="auth-form">
            <input
              type="text"
              placeholder="Full name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              value={form.name}
            />
            <input
              type="email"
              placeholder="Email address"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              value={form.email}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              value={form.password}
            />
            {error && (
              <div className="error-box">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <button className="primary" type="submit" disabled={!form.email || !form.password}>
              Create account
            </button>
          </form>

          <p className="small">
            Already have an account? <NavLink to="/login">Login</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
