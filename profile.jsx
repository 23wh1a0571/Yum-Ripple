import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    address: "",
    phone: "",
    dob: ""
  });
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!loggedIn) {
      navigate("/login");
      return;
    }

    const stored = JSON.parse(localStorage.getItem("currentUser")) || {};
    if (stored.name || stored.address || stored.phone || stored.dob) {
      setUser(stored);
      setIsEditing(false); // Already filled → show display mode
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    toast.success("✅ Profile saved successfully!");
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="profile-container">
      <ToastContainer position="top-center" autoClose={2000} />

      <img src="/avatar.png" alt="User Avatar" />
      <h2>Your Profile</h2>

      {isEditing ? (
        <div className="profile-form">
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={user.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Enter address"
            value={user.address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Enter phone number"
            value={user.phone}
            onChange={handleChange}
          />
          <input
            type="date"
            name="dob"
            placeholder="Enter Date of Birth"
            value={user.dob}
            onChange={handleChange}
          />
          <button onClick={handleSave}>Save Profile</button>
        </div>
      ) : (
        <div className="profile-display">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Date of Birth:</strong> {user.dob}</p>
          <button onClick={handleEdit}>Update Profile</button>
        </div>
      )}

      <button className="back-button" onClick={() => navigate("/")}>
        ⬅ Back to Home
      </button>
    </div>
  );
}
