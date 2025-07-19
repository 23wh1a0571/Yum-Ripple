import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MealPlanner.css";

const foodData = {
  breakfast: [
    { item: "2 Boiled Eggs", cal: 140 },
    { item: "Oatmeal with Milk", cal: 150 },
    { item: "Banana", cal: 90 },
    { item: "Avocado Toast", cal: 180 },
    { item: "Greek Yogurt + Berries", cal: 120 },
    { item: "Fruit Smoothie", cal: 160 },
    { item: "Pancakes (2)", cal: 200 },
  ],
  lunch: [
    { item: "Grilled Chicken Breast", cal: 280 },
    { item: "Brown Rice", cal: 215 },
    { item: "Dal + Rice", cal: 350 },
    { item: "Chapati (2) & Sabzi", cal: 300 },
    { item: "Veg Biryani", cal: 400 },
    { item: "Lentil Curry", cal: 250 },
    { item: "Fish Curry", cal: 320 },
  ],
  dinner: [
    { item: "Vegetable Soup", cal: 150 },
    { item: "Grilled Paneer", cal: 300 },
    { item: "Salad with Dressing", cal: 120 },
    { item: "Chapati & Dal", cal: 280 },
    { item: "Veg Stir Fry", cal: 200 },
    { item: "Tofu Curry", cal: 250 },
    { item: "Baked Sweet Potato", cal: 180 },
  ],
  snacks: [
    { item: "Almonds (handful)", cal: 160 },
    { item: "Apple", cal: 95 },
    { item: "Protein Bar", cal: 200 },
    { item: "Yogurt", cal: 110 },
    { item: "Carrot Sticks", cal: 50 },
    { item: "Boiled Corn", cal: 90 },
    { item: "Dark Chocolate (2 sq.)", cal: 120 },
  ],
};

function pickRandomMeals(mealArray, maxCal) {
  let total = 0;
  const options = [...mealArray];
  const chosen = [];

  while (options.length && total < maxCal) {
    const idx = Math.floor(Math.random() * options.length);
    const { item, cal } = options[idx];

    if (total + cal <= maxCal) {
      chosen.push({ item, cal });
      total += cal;
    }
    options.splice(idx, 1);
  }
  return chosen;
}

export default function MealPlanner() {
  const [calInput, setCalInput] = useState("");
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const goal = Number(calInput);

    if (isNaN(goal) || goal < 1000) {
      setError("Calorie target should be at least 1000 kcal.");
      setPlan(null);
      return;
    }
    setError("");

    const split = {
      breakfast: goal * 0.25,
      lunch: goal * 0.35,
      dinner: goal * 0.3,
      snacks: goal * 0.1,
    };

    const newPlan = {
      breakfast: pickRandomMeals(foodData.breakfast, split.breakfast),
      lunch: pickRandomMeals(foodData.lunch, split.lunch),
      dinner: pickRandomMeals(foodData.dinner, split.dinner),
      snacks: pickRandomMeals(foodData.snacks, split.snacks),
    };

    setPlan(newPlan);
  };

  const totalCal = (arr) => arr.reduce((sum, i) => sum + i.cal, 0);

  return (
    <div className="meal-planner-container">
      {/* Back Button */}
      <button className="button back-button" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      <h1>🥗 YumRipple Meal Planner</h1>

      <form className="meal-form" onSubmit={handleSubmit}>
        <label htmlFor="calInput">Daily Calorie Goal:</label>
        <input
          id="calInput"
          type="number"
          min="1000"
          placeholder="e.g. 2000"
          value={calInput}
          onChange={(e) => setCalInput(e.target.value)}
          required
        />
        <button type="submit">Generate Meal Plan</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {plan && (
        <div className="meal-results">
          <h2>🍴 Your Meal Plan</h2>
          {["breakfast", "lunch", "dinner", "snacks"].map((meal) => (
            <div className="meal-section" key={meal}>
              <h3 className="meal-heading">
                {meal.charAt(0).toUpperCase() + meal.slice(1)} – {totalCal(plan[meal])} kcal
              </h3>
              {plan[meal].length === 0 ? (
                <p>No items picked.</p>
              ) : (
                <ul className="meal-list">
                  {plan[meal].map(({ item, cal }, i) => (
                    <li key={i}>
                      <span className="item-name">{item}</span> –{" "}
                      <span className="item-cal">{cal} kcal</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
