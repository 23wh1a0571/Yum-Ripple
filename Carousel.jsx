// src/components/Carousel.jsx
import React from "react";
import "./Carousel.css";

const baseImages = [
  "food1.png",
  "food2.png",
  "food3.png",
  "food4.png",
  "food5.png",
  "food6.png",
  "food1.png", // Duplicate the first image for smooth looping
];

// Duplicate images to ensure seamless scroll
const images = [...baseImages, ...baseImages];

const Carousel = () => {
  return (
    <section className="carousel-container">
      <div className="carousel-overlay">
        <h2 className="carousel-title">Your Smart Cooking Companion</h2>
        <p className="carousel-subtext">
          Add, organize, and plan your favorite meals with ease.
        </p>
      </div>
      <div className="carousel-track">
        {images.map((src, idx) => (
            <img key={idx} src={src} alt={`Slide ${idx}`} className="carousel-image" />
        ))}
      </div>
    </section>
  );
};

export default Carousel;