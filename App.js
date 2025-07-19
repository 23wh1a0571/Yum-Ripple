import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import ViewByIngredients from "./pages/ViewByIngredients";
import ShoppingCategories from "./pages/ShoppingCategories";
import BillSummary from "./pages/BillSummary";
import AddRecipe from "./pages/AddRecipe";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Favorites from "./pages/Favorites";
import MealPlanner from "./pages/MealPlanner";
import Register from "./pages/Register";
import Ingredients from "./pages/Ingredients";
import Profile from "./pages/profile";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(status);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
        <Route path="/view-by-ingredients" element={<ViewByIngredients />} />
        <Route path="/shopping" element={<ShoppingCategories />} />
        <Route path="/bill" element={<BillSummary />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/meal-planner" element={<MealPlanner />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
