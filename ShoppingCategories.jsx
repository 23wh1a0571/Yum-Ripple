import React, { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./ShoppingCategories.css";

// --------------------------- CATEGORY DATA --------------------------- //
const vegetables = [
  { name: "Tomato", price: 30, quantity: "1 kg", image: "tomato.png" },
  { name: "Potato", price: 20, quantity: "1 kg", image: "potato.png" },
  { name: "Carrot", price: 50, quantity: "1 kg", image: "carrot.png" },
  { name: "Onion", price: 35, quantity: "1 kg", image: "onion.png" },
  { name: "Lemon", price: 5, quantity: "1 pc", image: "lemon.png" },
  { name: "Broccoli", price: 65, quantity: "1 pc", image: "broccoli.png" },
  { name: "Cucumber", price: 20, quantity: "1 kg", image: "cucumber.png" },
  { name: "Brinjal", price: 23, quantity: "1 kg", image: "brinjal.png" },
  { name: "Capsicum", price: 36, quantity: "1 kg", image: "capsicum.png" },
  { name: "Cauliflower", price: 32, quantity: "1 pc", image: "cauliflower.png" },
  { name: "Spinach", price: 25, quantity: "1 bunch", image: "spinach.png" },
  { name: "Green Beans", price: 40, quantity: "1 kg", image: "green_beans.png" },
  { name: "Peas", price: 45, quantity: "1 kg", image: "peas.png" },
  { name: "Radish", price: 22, quantity: "1 kg", image: "radish.png" },
];

const fruits = [
  { name: "Apple", price: 100, quantity: "1 kg", image: "apple.png" },
  { name: "Banana", price: 40, quantity: "1 dozen", image: "banana.png" },
  { name: "Orange", price: 60, quantity: "1 kg", image: "orange.png" },
  { name: "Mango", price: 120, quantity: "1 kg", image: "mango.png" },
  { name: "Grapes", price: 90, quantity: "1 kg", image: "grapes.png" },
  { name: "Strawberry", price: 80, quantity: "500 g", image: "strawberry.png" },
  { name: "Kiwi", price: 90, quantity: "3 pcs", image: "kiwi.png" },
  { name: "Watermelon", price: 60, quantity: "1 pc", image: "watermelon.png" },
  { name: "Papaya", price: 80, quantity: "1 pc", image: "papaya.png" },
  { name: "Pomegranate", price: 190, quantity: "1 kg", image: "pomegranate.png" },
  { name: "Cherry", price: 70, quantity: "250 g", image: "cherry.png" },
];

const spices = [
  { name: "Turmeric", price: 50, quantity: "100 g", image: "turmeric.png" },
  { name: "Cumin", price: 40, quantity: "100 g", image: "cumin.png" },
  { name: "Coriander Seeds", price: 35, quantity: "100 g", image: "CorianderSeeds.png" },
  { name: "Cardamom", price: 120, quantity: "50 g", image: "cardamom.png" },
  { name: "Black Pepper", price: 90, quantity: "100 g", image: "Black Pepper.png" },
  { name: "Cinnamon", price: 60, quantity: "100 g", image: "cinnamon.png" },
  { name: "Cloves", price: 100, quantity: "50 g", image: "cloves.png" },
  { name: "Mustard Seeds", price: 30, quantity: "100 g", image: "Mustard Seeds.png" },
  { name: "Red Chili Powder", price: 45, quantity: "100 g", image: "Red Chili Powder.png" },
  { name: "Fenugreek Seeds", price: 25, quantity: "100 g", image: "Fenugreek Seeds.png" },
  { name: "Saffron", price: 250, quantity: "1 g", image: "saffron.png" },
  { name: "Bay Leaves", price: 20, quantity: "25 g", image: "Bay Leaves.png" },
];

const dairy = [
  { name: "Milk", price: 50, quantity: "1 L", image: "milk.png" },
  { name: "Paneer", price: 150, quantity: "200 g", image: "paneer.png" },
  { name: "Butter", price: 90, quantity: "100 g", image: "butter.png" },
  { name: "Yogurt", price: 60, quantity: "500 g", image: "Yoget.png" },
  { name: "Cheese", price: 200, quantity: "200 g", image: "cheese.png" },
  { name: "Cream", price: 80, quantity: "200 ml", image: "cream.png" },
  { name: "Ghee", price: 300, quantity: "500 g", image: "Ghee.png" },
  { name: "Condensed Milk", price: 120, quantity: "400 g", image: "Condensed Milk.png" },
  { name: "Milk Powder", price: 350, quantity: "1 kg", image: "Milk Powder.png" },
  { name: "Buttermilk", price: 30, quantity: "500 ml", image: "buttermilk.png" },
];

const grains = [
  { name: "Rice", price: 60, quantity: "1 kg", image: "Rice.png" },
  { name: "Wheat", price: 45, quantity: "1 kg", image: "wheat.png" },
  { name: "Maize", price: 70, quantity: "1 kg", image: "maize.png" },
  { name: "Jowar", price: 50, quantity: "1 kg", image: "jowar.png" },
  { name: "Ragi", price: 80, quantity: "1 kg", image: "Ragi.png" },
];

const icecream = [
  { name: "Vanilla", price: 60, quantity: "100 ml", image: "vanilla.png" },
  { name: "Chocolate", price: 70, quantity: "100 ml", image: "chocolate.png" },
  { name: "Strawberry", price: 65, quantity: "100 ml", image: "strawberryice.png" },
  { name: "Pista", price: 55, quantity: "100 ml", image: "pista.png" },
  { name: "Mango", price: 75, quantity: "100 ml", image: "mangoice.png" },
  { name: "Black Current", price: 95, quantity: "100 ml", image: "blackcurrant.png" },
];

const bakery = [
  { name: "Bread", price: 25, quantity: "400 g", image: "bread.png" },
  { name: "Cake", price: 150, quantity: "500 g", image: "cake.png" },
  { name: "Cookies", price: 90, quantity: "250 g", image: "cookies.png" },
];

// --------------------------- COMPONENT --------------------------- //
export default function ShoppingCategories() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("vegetables");
  const [search, setSearch] = useState("");

  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const cartRef = useRef(null);

  const categoryItems = useMemo(() => {
    switch (category) {
      case "vegetables": return vegetables;
      case "fruits": return fruits;
      case "spices": return spices;
      case "dairy": return dairy;
      case "grains": return grains;
      case "icecream": return icecream;
      case "bakery": return bakery;
      default: return [];
    }
  }, [category]);

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return q ? categoryItems.filter((i) => i.name.toLowerCase().includes(q)) : categoryItems;
  }, [search, categoryItems]);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const addToCart = (item) => {
    setCart((prev) => {
      const found = prev.find((i) => i.name === item.name);
      return found
        ? prev.map((i) => (i.name === item.name ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...item, qty: 1 }];
    });
    setTimeout(() => cartRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const increaseQty = (name) => {
    setCart((prev) =>
      prev.map((i) => (i.name === name ? { ...i, qty: i.qty + 1 } : i))
    );
  };

  const decreaseQty = (name) => {
    setCart((prev) =>
      prev
        .map((i) => (i.name === name ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const proceedToPay = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      alert("Please log in to proceed to payment.");
      navigate("/login");
      return;
    }

    if (!cart.length) {
      alert("Cart is empty.");
      return;
    }

    navigate("/bill");
  };

  return (
    <div className="market-wrapper">
      <button className="back-button" onClick={() => navigate(-1)}>⬅ Back</button>
      <h1>YumRipple Market</h1>

      <div className="category-selector">
        {["vegetables", "fruits", "spices", "dairy", "grains", "icecream", "bakery"].map((cat) => (
          <button
            key={cat}
            className={cat === category ? "active" : ""}
            onClick={() => {
              setCategory(cat);
              setSearch("");
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <input
        id="searchBar"
        type="text"
        placeholder="Search items…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div id="itemsContainer">
        {filteredItems.length ? (
          filteredItems.map((item) => (
            <div key={item.name} className="item-card">
              <img src={item.image} alt={item.name} />
              <div className="item-name">{item.name}</div>
              <div className="item-price">₹{item.price}</div>
              <div className="item-quantity">{item.quantity}</div>
              <button className="add-to-cart-btn" onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p style={{ gridColumn: "1 / -1" }}>No items found.</p>
        )}
      </div>

      <div id="cart" ref={cartRef}>
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul id="cartItems">
              {cart.map((item) => (
                <li key={item.name}>
                  <span>{item.name} – ₹{item.price}</span>
                  <div className="quantity-controls">
                    <button className="quantity-btn" onClick={() => decreaseQty(item.name)}>-</button>
                    <span className="qty-text">{item.qty}</span>
                    <button className="quantity-btn" onClick={() => increaseQty(item.name)}>+</button>
                  </div>
                </li>
              ))}
            </ul>
            <div id="cartTotal">Total: ₹{total}</div>
          </>
        )}

        <button id="proceedBtn" onClick={proceedToPay}>Proceed to Pay</button>
      </div>
    </div>
  );
}