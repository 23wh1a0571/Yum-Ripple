// File: src/pages/Favorites.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewByIngredients.css";

function extractYouTubeID(url) {
  const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/|blob:)([a-zA-Z0-9_-]{11,})?/;
  const match = url.match(regExp);
  return match && match[1] ? match[1] : null;
}

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/login");
    } else {
      const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
      setFavorites(favs);
    }
  }, [navigate]);

  const removeFromFavorites = (recipeTitle) => {
    const updated = favorites.filter((r) => r.title !== recipeTitle);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="view-wrapper">
      <button className="button back-button" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      <section className="search-section">
        <h2 className="main-title">🧡 Your Favorite Recipes</h2>
        <p className="subtitle">These are your saved recipes.</p>
      </section>

      <section className="recipes-section">
        {favorites.length === 0 ? (
          <p className="no-results">You haven’t favorited any recipes yet.</p>
        ) : (
          <div className="grid">
            {favorites.map((rec, idx) => {
              const videoID = extractYouTubeID(rec.youtube);
              return (
                <div key={idx} className="recipe-card">
                  <div className="card-controls">
                    <button
                      className="icon-btn text-red-500"
                      title="Remove from Favorites"
                      onClick={() => removeFromFavorites(rec.title)}
                    >
                      💔
                    </button>
                  </div>

                  <img
                    src={rec.image}
                    alt={rec.title}
                    className="recipe-image"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/400x200?text=No+Image")
                    }
                  />

                  <h4>{rec.title}</h4>
                  <p>
                    <strong>Ingredients:</strong> {rec.ingredients.join(", ")}
                  </p>
                  {rec.steps && (
                    <p>
                      <strong>Steps:</strong> {rec.steps}
                    </p>
                  )}

                  {rec.youtube?.startsWith("blob:") ? (
                    <video src={rec.youtube} controls className="video" />
                  ) : videoID ? (
                    <iframe
                      className="video"
                      src={`https://www.youtube.com/embed/${videoID}`}
                      title={rec.title}
                      frameBorder="0"
                      allowFullScreen
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Favorites;