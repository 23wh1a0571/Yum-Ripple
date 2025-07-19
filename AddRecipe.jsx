import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddRecipe.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fileToBase64 = (file) =>
  new Promise((resolve) => {
    if (!file) return resolve("");
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });

export default function AddRecipe() {
  const [dishName, setDishName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      toast.error("Please log in to add a recipe.");
      setTimeout(() => navigate("/login"), 1500);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageSrc = imageUrl.trim();
    if (!imageSrc && imageFile) {
      imageSrc = await fileToBase64(imageFile);
    }

    if (!imageSrc) {
      toast.error("Please provide a dish image (upload or URL).");
      return;
    }

    const newRecipe = {
      title: dishName.trim(),
      ingredients: ingredients
        .split("\n")
        .map((i) => i.trim().toLowerCase())
        .filter(Boolean),
      image: imageSrc,
      youtube: videoUrl.trim(),
      userEmail: JSON.parse(localStorage.getItem("currentUser"))?.email || "",
      createdAt: Date.now(),
    };

    const existing = JSON.parse(localStorage.getItem("userRecipes") || "[]");
    existing.push(newRecipe);
    localStorage.setItem("userRecipes", JSON.stringify(existing));

    toast.success("🎉 Recipe added!");

    setDishName("");
    setIngredients("");
    setImageFile(null);
    setImageUrl("");
    setVideoUrl("");
    e.target.reset();
  };

  return (
    <div className="add-recipe-wrapper">
      <ToastContainer position="top-center" autoClose={2500} />

      {/* ✅ Clean Back Button with ash style */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          top: "15px",
          left: "15px",
          backgroundColor: "#f3f4f6", // soft ash
          border: "1px solid #cbd5e1", // light border
          borderRadius: "8px",
          padding: "6px 12px",
          fontSize: "14px",
          fontWeight: "bold",
          cursor: "pointer",
          color: "#374151", // dark gray text
          boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
          transition: "background 0.2s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#e5e7eb")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#f3f4f6")}
      >
        ⬅ Back
      </button>

      <header>
        <h1>🍲 YumRipple</h1>
      </header>

      <main>
        <h2>Add New Recipe</h2>
        <form className="recipe-form" onSubmit={handleSubmit}>
          <label>
            Dish Name:
            <input
              type="text"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              required
            />
          </label>

          <label>
            Ingredients (one per line):
            <textarea
              rows="5"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
            />
          </label>

          <fieldset className="img-section">
            <legend>Dish Photo (choose one)</legend>
            <label>
              Upload image:
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </label>
            <span>— or —</span>
            <label>
              Image URL:
              <input
                type="url"
                placeholder="https://example.com/dish.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
          </fieldset>

          <label>
            Video or Tutorial Link (optional):
            <input
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </label>

          <button type="submit">Add Recipe</button>
        </form>
      </main>
    </div>
  );
}
