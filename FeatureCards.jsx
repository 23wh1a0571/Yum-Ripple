// src/components/FeatureCards.jsx
import "./FeatureCards.css";
import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "🍳 Add Recipes",
    description: "Create and upload your favorite meal ideas to share or reuse.",
    link: "/add-recipe",
  },
  {
    title: "🧂 View by Ingredients",
    description: "Find recipes using ingredients you already have at home.",
    link: "/view-by-ingredients",
  },
  {
    title: "🧡 Favorite Recipes",
    description: "Save recipes you love and access them anytime, anywhere.",
    link: "/favorites",
  },
  {
    title: "📅 Meal Planner",
    description: "Plan meals for the week and stay consistent with your diet.",
    link: "/meal-planner",
  },
  {
    title: "🛒 Shopping",
    description: "Shop by category: vegetables, fruits, beverages, spices, and more.",
    link: "/shopping",
  },
];

const FeatureCards = () => {
  return (
    <section className="features-section">
      <div className="features-grid">
        {features.map((card, index) => (
          <Link key={index} to={card.link} className="feature-card">
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;