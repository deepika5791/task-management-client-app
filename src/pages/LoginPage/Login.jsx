import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import API from "../../api";
import { AuthContext } from "../../context/AuthProvider";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleform = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      loginUser(res.data.user, res.data.token);
      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
 
      <div className="auth-left">
        <h1>Your Project Name</h1>
        <p>Manage your tasks, stay organized, and boost productivity.</p>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2>Welcome back</h2>
          <p className="muted">Sign in to continue.</p>

          <form onSubmit={handleform} className="auth-form">
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
            <button className="primary" type="submit">
              Login
            </button>
          </form>

          <p className="small">
            Don’t have an account? <NavLink to="/signup">Signup</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
