import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Ingredients.css";
import { fetchWithKeys } from "../utils/fetchWithKeys";

export default function Ingredients() {
  const [searchText, setSearchText] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [details, setDetails] = useState({});
  const navigate = useNavigate();

  const popularIngredients = [
    "Tomato", "Potato", "Onion", "Carrot", "Rice",
    "Wheat", "Apple", "Banana", "Milk", "Cheese",
    "Egg", "Chicken", "Garlic", "Ginger", "Spinach"
  ];

  const searchIngredients = async (query = searchText) => {
    if (!query.trim()) return;
    try {
      const result = await fetchWithKeys(
        (k) =>
          `https://api.spoonacular.com/food/ingredients/search?query=${encodeURIComponent(
            query
          )}&number=15&apiKey=${k}`
      );
      setIngredients(result.results || []);
      setOpenIndex(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const loadDetails = async (id, idx) => {
    if (!id) {
      alert("Ingredient ID missing.");
      return;
    }

    try {
      const info = await fetchWithKeys(
        (k) =>
          `https://api.spoonacular.com/food/ingredients/${id}/information?amount=100&unit=gram&includeNutrition=true&apiKey=${k}`
      );

      const wanted = {
        Calories: "calories",
        Protein: "protein",
        Carbohydrates: "carbs",
        Fat: "fat",
      };
      const parsed = {};
      info.nutrition?.nutrients.forEach((n) => {
        if (wanted[n.name]) parsed[wanted[n.name]] = n.amount + (n.unit || "");
      });

      setDetails((prev) => ({
        ...prev,
        [id]: { ...info, parsed },
      }));
      setOpenIndex(idx);
    } catch (err) {
      setDetails((prev) => ({
        ...prev,
        [id]: { error: true, message: err.message },
      }));
      setOpenIndex(idx);
    }
  };

  const fallbackMap = {
    tomato: "/tomato.png",
    potato: "/potato.png",
    onion: "/onion.png",
    carrot: "/carrot.png",
    rice: "/Rice.png",
    wheat: "/wheat.png",
    apple: "/apple.png",
    banana: "/banana.png",
    milk: "/milk.png",
    cheese: "/cheese.png",
    egg: "/egg.png",
    chicken: "/chicken.png",
    garlic: "/garlic.png",
    ginger: "/ginger.png",
    spinach: "/spinach.png",
  };

  return (
    <div className="market-wrapper">
      <button className="back-button" onClick={() => navigate(-1)}>⬅ Back</button>
      <h1>YumRipple Ingredients Encyclopedia</h1>

      <input
        className="search-bar"
        placeholder="Search ingredients…"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && searchIngredients()}
      />

      <div id="itemsContainer">
        {ingredients.length === 0 && openIndex === null ? (
          <div className="popular-grid">
            {popularIngredients.map((item, idx) => (
              <div
                key={idx}
                className="item-card"
                onClick={() => {
                  setSearchText(item);
                  searchIngredients(item);
                }}
              >
                <img
                  src={`https://spoonacular.com/cdn/ingredients_250x250/${item.toLowerCase()}.jpg`}
                  alt={item}
                  onError={(e) => {
                    const key = item.toLowerCase();
                    e.target.src = fallbackMap[key] || "/fallback.png";
                  }}
                />
                <div className="item-name">{item}</div>
              </div>
            ))}
          </div>
        ) : openIndex !== null && ingredients[openIndex] ? (
          <div className="item-card expanded">
            <button className="close-btn" onClick={() => setOpenIndex(null)}>❌</button>
            <img
              src={`https://spoonacular.com/cdn/ingredients_250x250/${ingredients[openIndex].image}`}
              alt={ingredients[openIndex].name}
              onError={(e) => {
                const key = ingredients[openIndex].name.toLowerCase();
                e.target.src = fallbackMap[key] || "/fallback.png";
              }}
            />
            <div className="item-name">{ingredients[openIndex].name}</div>
            <div className="ingredient-modal">
              {details[ingredients[openIndex].id]?.parsed ? (
                <>
                  <p><strong>Nutrition (per 100g)</strong></p>
                  <ul>
                    <li>Calories: {details[ingredients[openIndex].id].parsed.calories || "N/A"}</li>
                    <li>Protein: {details[ingredients[openIndex].id].parsed.protein || "N/A"}</li>
                    <li>Carbs: {details[ingredients[openIndex].id].parsed.carbs || "N/A"}</li>
                    <li>Fat: {details[ingredients[openIndex].id].parsed.fat || "N/A"}</li>
                  </ul>
                </>
              ) : (
                <p>{details[ingredients[openIndex].id]?.message || "Data unavailable."}</p>
              )}
            </div>
          </div>
        ) : (
          ingredients.map((item, idx) => (
            <div
              key={item.id}
              className="item-card"
              onClick={() => loadDetails(item.id, idx)}
            >
              <img
                src={`https://spoonacular.com/cdn/ingredients_250x250/${item.image}`}
                alt={item.name}
                onError={(e) => {
                  const key = item.name.toLowerCase();
                  e.target.src = fallbackMap[key] || "/fallback.png";
                }}
              />
              <div className="item-name">{item.name}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
