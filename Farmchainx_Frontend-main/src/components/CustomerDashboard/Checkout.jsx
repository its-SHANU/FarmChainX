import React, { useState } from "react";
import { useCart } from "../../context/Cart";
import "../../styles/components/checkout.css";
import { useRetailerCart } from "../../context/RetailerCartContext";


export default function Checkout() {
  // const { total } = useCart();
  const user = JSON.parse(localStorage.getItem("user"));

const customerCart = useCart();
const retailerCart = useRetailerCart();

const isRetailer = user?.role === "RETAILER";

const total = isRetailer
  ? retailerCart.total
  : customerCart.total;
////////////////////

  const [cardData, setCardData] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: ""
  });

  const handleChange = (e) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    alert("Payment gateway not connected yet.\nThis is UI only.");
  };

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <h1 className="checkout-title">Secure Checkout</h1>

        <div className="checkout-amount">
          <span>Total Amount</span>
          <strong>₹{total}</strong>
        </div>

        <form onSubmit={handlePayment} className="payment-form">
          <div className="form-group">
            <label>Card Holder Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={cardData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              name="number"
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              value={cardData.number}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Expiry</label>
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                maxLength="5"
                value={cardData.expiry}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>CVV</label>
              <input
                type="password"
                name="cvv"
                placeholder="***"
                maxLength="3"
                value={cardData.cvv}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="pay-btn">
            Pay ₹{total}
          </button>

          <p className="secure-note">
            🔒 This is a secure payment form (demo UI)
          </p>
        </form>
      </div>
    </div>
  );
}
