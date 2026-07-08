import React from "react";
import { useRetailerCart } from "../../context/RetailerCartContext";
import { Link } from "react-router-dom";

export default function RetailerCart() {
  const { cart, removeFromCart, total } = useRetailerCart();


  return (
    <div className="cart-container">
      <h1 className="cart-title">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty</p>
          <Link to="/retailerdashboard" className="btn-primary">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item._id} className="cart-item-card">
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">₹ {item.price}</p>
                  <p className="cart-item-qty">Qty: {item.qty}</p>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Total Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="summary-row">
              <span>Total Amount</span>
              <span className="summary-total">₹ {total}</span>
            </div>

            <Link to="/retailer/checkout">
              <button className="btn-primary full-width">
                Proceed to Checkout
              </button>
            </Link>

            <Link to="/retailerdashboard">
              <button className="btn-secondary full-width">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
