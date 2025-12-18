import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import API from "../../api";
import { AuthContext } from "../../context/AuthProvider";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { loginUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleform = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);
      loginUser(res.data.user, res.data.token);
      navigate("/home");
    } catch (err) {
      setError(
        err.response?.data?.message === "User does not exist"
          ? "User not found. Please sign up first."
          : "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1>Task Manager</h1>
        <p>Manage your tasks, stay organized, and boost productivity.</p>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2>Welcome back</h2>
          <p className="muted">Login to continue.</p>

          {error && (
            <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
          )}

          <form onSubmit={handleform} className="auth-form">
            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button className="primary" type="submit" disabled={loading}>
              {loading ? <span className="btn-spinner"></span> : "Login"}
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
