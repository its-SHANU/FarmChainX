import React, { useEffect, useCallback, useState } from "react";
import { useCart } from "../../context/Cart";
import { useRetailerCart } from "../../context/RetailerCartContext";
import "../../styles/components/cart.css";

const CROP_EMOJI = {
  Wheat: "🌾",
  Rice: "🌾",
  Vegetable: "🥦",
  Vegetables: "🥦",
  Fruit: "🍎",
  Fruits: "🍎",
  Dairy: "🥛",
  Grain: "🌽",
  Pulse: "🫘",
  Pulses: "🫘",
  Spice: "🌶️",
  Spices: "🌶️",
  default: "🌿",
};

function getEmoji(cropType) {
  if (!cropType) return CROP_EMOJI.default;
  return (
    CROP_EMOJI[cropType] ||
    CROP_EMOJI[
      Object.keys(CROP_EMOJI).find((k) =>
        cropType.toLowerCase().includes(k.toLowerCase())
      )
    ] ||
    CROP_EMOJI.default
  );
}

export default function CartDrawer({ isOpen, onClose, user }) {
  const customerCart = useCart();
  const retailerCart = useRetailerCart();

  const [step, setStep] = useState("cart"); // "cart" | "checkout"
  const [cardData, setCardData] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  const isRetailer = user?.role === "RETAILER";
  const cart = isRetailer ? retailerCart.cart : customerCart.cart;
  const removeFromCart = isRetailer
    ? retailerCart.removeFromCart
    : customerCart.removeFromCart;
  const total = isRetailer ? retailerCart.total : customerCart.total;
  const addToCart = isRetailer ? retailerCart.addToCart : customerCart.addToCart;
  const clearCart = isRetailer ? retailerCart.clearCart : customerCart.clearCart;

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Prevent background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset back to the cart view whenever the drawer is closed
  useEffect(() => {
    if (!isOpen) {
      setStep("cart");
      setCardData({ name: "", number: "", expiry: "", cvv: "" });
    }
  }, [isOpen]);

  const handleCheckout = () => {
    setStep("checkout");
  };

  const handleBackToCart = () => {
    setStep("cart");
  };

  const handleContinueShopping = () => {
    onClose();
  };

  const handleCardChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    alert("Payment gateway not connected yet.\nThis is UI only.");
    clearCart && clearCart();
    setStep("cart");
    onClose();
  };

  const itemCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  return (
    <>
      {/* Blurred overlay */}
      <div
        className={`cart-overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        className={`cart-drawer ${isOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="cart-drawer-header">
          <div className="cart-drawer-title">
            {step === "checkout" ? (
              <button
                className="cart-back-btn"
                onClick={handleBackToCart}
                aria-label="Back to cart"
              >
                ←
              </button>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: "#f4a261" }}
              >
                <path
                  d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 6H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            <h2>{step === "checkout" ? "Secure Checkout" : "Your Cart"}</h2>
            {step === "cart" && itemCount > 0 && (
              <span className="cart-badge" key={itemCount}>
                {itemCount}
              </span>
            )}
          </div>
          <button
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="cart-drawer-body">
          {step === "checkout" ? (
            <>
              <div className="cart-checkout-amount">
                <span>Total Amount</span>
                <strong>₹{total.toLocaleString()}</strong>
              </div>

              <form
                onSubmit={handlePayment}
                className="cart-checkout-form"
                id="cart-checkout-form"
              >
                <div className="form-group">
                  <label>Card Holder Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={cardData.name}
                    onChange={handleCardChange}
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
                    onChange={handleCardChange}
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
                      onChange={handleCardChange}
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
                      onChange={handleCardChange}
                      required
                    />
                  </div>
                </div>
              </form>

              <p className="cart-secure-note">
                🔒 This is a secure payment form (demo UI)
              </p>
            </>
          ) : cart.length === 0 ? (
            <div className="cart-empty-state">
              <div className="cart-empty-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Add some fresh farm products to get started!</p>
              <button className="cart-shop-btn" onClick={handleContinueShopping}>
                Browse Products
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id || item._id}>
                {/* Thumbnail */}
                <div className="cart-item-thumb">
                  {item.imageUrl ? (
                    <img
                      src={`http://localhost:8080${item.imageUrl}`}
                      alt={item.name}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentNode.textContent = getEmoji(item.cropType);
                      }}
                    />
                  ) : (
                    getEmoji(item.cropType)
                  )}
                </div>

                {/* Details */}
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  {item.farmer?.name && (
                    <div className="cart-item-farmer">
                      by {item.farmer.name}
                    </div>
                  )}
                  <div className="cart-item-price-row">
                    <span className="cart-item-unit-price">
                      ₹{item.price?.toLocaleString()} × {item.qty}
                    </span>
                    <span className="cart-item-total-price">
                      = ₹{((item.price || 0) * item.qty).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Right controls */}
                <div className="cart-item-right">
                  <div className="cart-qty-controls">
                    <button
                      className="cart-qty-btn"
                      onClick={() => {
                        if (item.qty <= 1) {
                          removeFromCart(item.id);
                        } else {
                          // Decrease qty: remove then re-add with qty-1
                          removeFromCart(item.id);
                          for (let i = 0; i < item.qty - 1; i++) {
                            addToCart(item);
                          }
                        }
                      }}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="cart-qty-value">{item.qty}</span>
                    <button
                      className="cart-qty-btn"
                      onClick={() => addToCart(item)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="cart-remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    🗑 Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {step === "checkout" ? (
          <div className="cart-drawer-footer">
            <button
              type="submit"
              form="cart-checkout-form"
              className="cart-pay-btn"
            >
              Pay ₹{total.toLocaleString()}
            </button>
            <button className="cart-continue-btn" onClick={handleBackToCart}>
              ← Back to Cart
            </button>
          </div>
        ) : (
          cart.length > 0 && (
            <div className="cart-drawer-footer">
              <div className="cart-summary-rows">
                <div className="cart-summary-row">
                  <span>Items</span>
                  <span>{itemCount} item{itemCount !== 1 ? "s" : ""}</span>
                </div>
                <div className="cart-summary-row">
                  <span>Subtotal</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <div className="cart-summary-row">
                  <span>Delivery</span>
                  <span style={{ color: "#2a9d8f", fontWeight: 600 }}>FREE</span>
                </div>
                <div className="cart-summary-row total">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="cart-savings-badge">
                ✅ Farm-fresh, sourced directly
              </div>

              <div className="cart-footer-btns">
                <button className="cart-checkout-btn" onClick={handleCheckout}>
                  Proceed to Checkout →
                </button>
                <button
                  className="cart-continue-btn"
                  onClick={handleContinueShopping}
                >
                  Continue Shopping
                </button>
                {cart.length > 1 && (
                  <button
                    className="cart-clear-btn"
                    onClick={() => clearCart && clearCart()}
                  >
                    🗑 Clear all items
                  </button>
                )}
              </div>
            </div>
          )
        )}
      </aside>
    </>
  );
}
