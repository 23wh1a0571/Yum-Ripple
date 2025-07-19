import React, { useEffect, useState } from "react";
import "./BillSummary.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BillSummary() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    card: "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
    const grandTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    setTotal(grandTotal);
  }, []);

  const handlePay = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      toast.error("Please log in to make a payment.");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    const { name, card, expiry, cvv } = formData;
    if (!name || !card || !expiry || !cvv) {
      toast.warn("Please fill all payment fields.");
      return;
    }

    toast.success(`₹${total} paid successfully. Thank you, ${name}!`);

    localStorage.removeItem("cart");
    setCartItems([]);
    setFormData({ name: "", card: "", expiry: "", cvv: "" });

    setTimeout(() => navigate("/"), 3000); // redirect after toast
  };

  return (
    <div className="bill-wrapper">
      <ToastContainer position="top-center" autoClose={2500} />

      <h1>Order Summary</h1>
      <div className="bill-box">
        <h2>Items</h2>
        <table className="bill-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price (₹)</th>
              <th>Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No items in the cart.
                </td>
              </tr>
            ) : (
              cartItems.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>₹{item.price}</td>
                  <td>₹{item.qty * item.price}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="total-amount">Total: ₹{total}</div>

        <div className="payment-section">
          <h2>Payment</h2>

          <label>Full Name</label>
          <input
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <label>Card Number</label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            value={formData.card}
            onChange={(e) => setFormData({ ...formData, card: e.target.value })}
          />

          <label>Expiry Date</label>
          <input
            type="text"
            placeholder="MM/YY"
            value={formData.expiry}
            onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
          />

          <label>CVV</label>
          <input
            type="text"
            placeholder="123"
            value={formData.cvv}
            onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
          />

          <button id="payBtn" onClick={handlePay}>Pay Now</button>
        </div>
      </div>
    </div>
  );
}