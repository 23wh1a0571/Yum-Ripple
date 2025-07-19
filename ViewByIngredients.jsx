// File: src/pages/ViewByIngredients.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewByIngredients.css";

const sampleRecipes = [
  {
    title: "Spaghetti Aglio e Olio",
    ingredients: ["spaghetti", "garlic", "olive oil", "parsley", "chili flakes"],
    image: "https://i.ytimg.com/vi/3AAdKl1UYZs/maxresdefault.jpg",
    youtube: "https://www.youtube.com/watch?v=3AAdKl1UYZs",
    steps: "Boil pasta, sauté garlic, add chili flakes, mix with pasta.",
  },
  {
    title: "Cheese Garlic Bread",
    ingredients: ["bread", "garlic", "butter", "parsley"],
    image: "https://i.ytimg.com/vi/lDWzcWY0llk/maxresdefault.jpg",
    youtube: "https://www.youtube.com/shorts/lDWzcWY0llk",
    steps: "Mix butter and garlic, spread on bread, top with cheese, bake.",
  },
  {
    title: "Creamy Tomato Soup",
    ingredients: ["tomato", "onion", "garlic", "cream", "basil"],
    image: "https://i.ytimg.com/vi/XTlhM2NrtXk/maxresdefault.jpg",
    youtube: "https://www.youtube.com/shorts/XTlhM2NrtXk",
    steps: "Cook tomatoes and onion, blend, add cream and basil, simmer.",
  },
];

const apiKeys = [
  "6a7953dfe924405c9156c409b0cd1fb4",
  "5575f182c26b46b8b3cc772222b34519",
  "23bd2600d2ff4ef383a5d51f0ec0e296",
  "913adba28865444e8df25c7e65d07279",
  "abdbef560a8a467da1f1a9395b73d2ba",
  "4857c561962d41f7995570839c2406f5",
];

const extractYouTubeID = (url = "") => {
  const re = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/;
  const m = url.match(re);
  return m ? m[1] : null;
};

export default function ViewByIngredients() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState(sampleRecipes);
  const [favorites, setFavorites] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]").map((r) => r.title) || [];
    setFavorites(favs);
  }, []);

  const toggleFavorite = (rec) => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    const exists = stored.some((r) => r.title === rec.title);
    const updated = exists
      ? stored.filter((r) => r.title !== rec.title)
      : [...stored, {
          title: rec.title,
          image: rec.image,
          ingredients: rec.ingredients,
          youtube: rec.youtube,
          steps: rec.steps || "No steps found.",
        }];
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated.map((r) => r.title));
  };

  const handleDelete = (rec) => {
    if (!window.confirm(`Delete "${rec.title}"?`)) return;
    setRecipes((rs) => rs.filter((r) => r.title !== rec.title));
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]").filter(
      (r) => r.title !== rec.title
    );
    localStorage.setItem("favorites", JSON.stringify(favs));
    setFavorites(favs.map((r) => r.title));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const ingredients = query.trim();
    let data = null;

    for (let i = 0; i < apiKeys.length; i++) {
      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=6&apiKey=${apiKeys[i]}`
        );
        if (res.ok) {
          data = await res.json();
          break;
        }
      } catch (_) {}
    }

    if (!data) {
      alert("All API keys failed or quota exhausted. Try again later.");
      return;
    }

    const results = await Promise.all(
      data.map(async (r) => {
        let instructions = "No steps found.";
        for (let k = 0; k < apiKeys.length; k++) {
          try {
            const res = await fetch(
              `https://api.spoonacular.com/recipes/${r.id}/information?includeNutrition=false&apiKey=${apiKeys[k]}`
            );
            if (res.ok) {
              const info = await res.json();
              instructions = info.instructions
                ? info.instructions.replace(/<[^>]+>/g, "")
                : "No steps found.";
              break;
            }
          } catch (_) {}
        }

        return {
          title: r.title,
          image: r.image,
          ingredients: r.usedIngredients
            .map((i) => i.name)
            .concat(r.missedIngredients.map((i) => i.name)),
          youtube: "",
          steps: instructions,
        };
      })
    );

    setRecipes(results);
    setOpenIndex(null);
  };

  return (
    <div className="view-wrapper">
      <button className="button back-button" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      <section className="search-section">
        <h2 className="main-title">🍲 YumRipple</h2>
        <p className="subtitle">Enter ingredients (comma-separated)…</p>
        <form onSubmit={handleSearch}>
          <input
            className="input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., rice, tomato"
          />
          <button className="button" type="submit">
            Search
          </button>
        </form>
      </section>

      <section className="recipes-section">
        {recipes.length === 0 ? (
          <p className="no-results">No recipes found.</p>
        ) : openIndex !== null ? (
          (() => {
            const rec = recipes[openIndex];
            const fav = favorites.includes(rec.title);
            const videoID = extractYouTubeID(rec.youtube);
            return (
              <div className="recipe-card expanded">
                <div className="card-controls">
                  <button
                    className={`icon-btn ${fav ? "text-red-500" : "text-gray-400"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(rec);
                    }}
                  >
                    {fav ? "❤" : "🤍"}
                  </button>
                  <button className="icon-btn close-btn" onClick={() => setOpenIndex(null)}>
                    ❌
                  </button>
                </div>

                <img src={rec.image} alt={rec.title} className="recipe-image" />
                <h4>{rec.title}</h4>
                <p>
                  <strong>Ingredients:</strong> {rec.ingredients.join(", ")}
                </p>
                <p>
                  <strong>Steps:</strong> {rec.steps}
                </p>

                {videoID && (
                  <iframe
                    className="video"
                    src={`https://www.youtube.com/embed/${videoID}`}
                    title={rec.title}
                    allowFullScreen
                  />
                )}

                <div className="delete-container">
                  <button
                    className="icon-btn delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(rec);
                    }}
                  >
                    🗑
                  </button>
                </div>
              </div>
            );
          })()
        ) : (
          <div className="grid">
            {recipes.map((rec, idx) => {
              const fav = favorites.includes(rec.title);
              return (
                <div key={idx} className="recipe-card" onClick={() => setOpenIndex(idx)}>
                  <div className="card-controls">
                    <button
                      className={`icon-btn ${fav ? "text-red-500" : "text-gray-400"}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(rec);
                      }}
                    >
                      {fav ? "❤" : "🤍"}
                    </button>
                  </div>
                  <img src={rec.image} alt={rec.title} className="recipe-image" />
                  <h4>{rec.title}</h4>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}