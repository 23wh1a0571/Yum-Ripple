import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.warn("Please enter both email and password.");
      return;
    }

    try {
      const res = await api.post("/auth/login", {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      const { token, email: userEmail } = res.data;

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("token", token);

      toast.success(`Welcome back, ${userEmail.split("@")[0]}! 🎉`);

      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2500);
    } catch (err) {
      toast.error("Login failed: " + (err.response?.data || "Invalid credentials"));
    }
  };

  return (
    <div
      className="login-wrapper"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/image.png"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="login-card">
        <h2 className="login-title">🔐 Login to Your Account</h2>
        <p className="login-subtext">🍲 Access your saved recipes and more.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="login-input"
              placeholder="you@example.com"
            />
          </label>

          <label className="login-label">
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="login-input"
              placeholder=""
            />
          </label>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p className="login-footer">
          Don’t have an account? <Link to="/register">Register here</Link>.
        </p>
      </div>
    </div>
  );
}