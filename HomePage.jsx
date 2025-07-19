// File: src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import "./HomePage.css";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(status);
  }, []);

  const images = [
    "/food1.png",
    "/food2.png",
    "/food3.png",
    "/food4.png",
    "/food5.png",
    "/food6.png",
  ];

  return (
    <>
      {/* ---------- Header ---------- */}
      <header>
        <div
          className="inner-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>🍲 YumRipple</h1>

          {!isLoggedIn ? (
            <nav>
              <a
                href="/login"
                style={{ fontWeight: "bold", fontSize: "16px" }}
              >
                Login
              </a>
            </nav>
          ) : (
            <div style={{ position: "relative" }}>
              <img
                src="/avatar.png"
                alt="Profile"
                onClick={() => setShowDropdown((prev) => !prev)}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  border: "2px solid #06b6d4",
                }}
              />
              {showDropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "50px",
                    right: "0",
                    background: "white",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    width: "150px",
                    zIndex: 10,
                  }}
                >
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      window.location.href = "/profile";
                    }}
                    style={{
                      padding: "10px",
                      width: "100%",
                      textAlign: "left",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      localStorage.removeItem("isLoggedIn");
                      localStorage.removeItem("userEmail");
                      window.location.reload();
                    }}
                    style={{
                      padding: "10px",
                      width: "100%",
                      textAlign: "left",
                      border: "none",
                      background: "transparent",
                      color: "red",
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* ---------- Hero slider ---------- */}
      <section className="hero">
        <div className="hero-slider">
          {images.concat(images).map((src, i) => (
            <img key={i} src={src} alt={`Food ${i + 1}`} />
          ))}
        </div>

        <div className="hero-overlay">
          <h2 className="hero-title">Your Smart Cooking Companion</h2>
          <p className="hero-subtext">
            Add, organize, and plan your favorite meals with ease.
          </p>
        </div>
      </section>

      {/* ---------- Feature cards ---------- */}
      <section className="features">
        {[
          {
            title: "🍳 Add Recipes",
            text: "Create and upload your favorite meal ideas.",
            href: "/add-recipe",
          },
          {
            title: "🧂 View by Ingredients",
            text: "Find recipes with ingredients you have.",
            href: "/view-by-ingredients",
          },
          {
            title: "🧡 Favorite Recipes",
            text: "Save and access recipes anytime.",
            href: "/favorites",
          },
          {
            title: "📅 Meal Planner",
            text: "Plan meals for the week.",
            href: "/meal-planner",
          },
          {
            title: "🛒 Shopping",
            text: "Shop by food category.",
            href: "/shopping",
          },
          {
            title: "📘 Ingredients Encyclopedia",
            text: "Explore grains, veggies, and kitchen staples.",
            href: "/ingredients",
          },
        ].map(({ title, text, href }) => (
          <a key={title} href={href} className="feature-card">
            <h3>{title}</h3>
            <p>{text}</p>
          </a>
        ))}
      </section>

      {/* ---------- Footer ---------- */}
      <footer>&copy; 2025 Food Recipe Finder. All rights reserved.</footer>
    </>
  );
}
