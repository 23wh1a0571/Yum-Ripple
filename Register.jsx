import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.warn("Passwords do not match!");
      return;
    }

    try {
      const res = await api.post("/auth/register", {
        name: form.name.trim(),
        username: form.name.trim(), // using name as username
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      const { token, email: userEmail } = res.data;

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("token", token);

      toast.success(`Welcome, ${form.name.trim()}! 🎉`);

      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2500);
    } catch (err) {
      toast.error(err.response?.data || "Registration failed");
    }
  };

  return (
    <div
      className="register-wrapper"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/image.png"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      {/* ✅ Top-Right Toast Notification */}
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="register-card">
        <h2 className="register-title">📝 Create an Account</h2>
        <p className="register-subtext">
          Join us to explore and save your favourite recipes!
        </p>

        <form className="register-form" onSubmit={handleSubmit}>
          <label className="register-label">
            Full Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="register-input"
              placeholder="Your name"
            />
          </label>

          <label className="register-label">
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="register-input"
              placeholder="you@example.com"
            />
          </label>

          <label className="register-label">
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="register-input"
            />
          </label>

          <label className="register-label">
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="register-input"
            />
          </label>

          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        <p className="register-footer">
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
      </div>
    </div>
  );
}