import React from "react";
import { useCart } from "../../context/Cart";
import { Link } from "react-router-dom";
import { useRetailerCart } from "../../context/RetailerCartContext";

export default function Cart() {
  // const { cart, removeFromCart, total } = useCart();
  const user = JSON.parse(localStorage.getItem("user"));

const customerCart = useCart();
const retailerCart = useRetailerCart();

const isRetailer = user?.role === "RETAILER";

const cart = isRetailer ? retailerCart.cart : customerCart.cart;
const removeFromCart = isRetailer
  ? retailerCart.removeFromCart
  : customerCart.removeFromCart;
const total = isRetailer ? retailerCart.total : customerCart.total;

  return (
    <div className="cart-container">
      <h1 className="cart-title">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty</p>
          <Link to="/customerdashboard" className="btn-primary">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          
          {/* LEFT: ITEMS LIST */}
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
  onClick={() => {
    console.log("Removing:", item.id);
    removeFromCart(item.id);
  }}
>
  Remove
</button>
              </div>
            ))}
          </div>

          {/* RIGHT: SUMMARY CARD */}
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

            {/* <Link to="/checkout">
              <button className="btn-primary full-width">Proceed to Checkout</button>
            </Link> */}

            <Link to="/customerdashboard">
              <button className="btn-secondary full-width">Continue Shopping</button>
            </Link>
            <Link to={user?.role === "RETAILER" ? "/retailer/checkout" : "/checkout"}>
            <button className="btn-primary full-width">
            Proceed to Checkout
            </button>
          </Link>
          </div>

        </div>
      )}
    </div>
  );
}
