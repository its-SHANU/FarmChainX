import React from 'react';
import '../../styles/globals.css';
import { useCart } from "../../context/Cart";

function Header({ title, user, onLogout, onCartOpen }) {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  return (
    <header className="header">
      <div className="header-container">
        {/* Left Section - Logo and Title */}
        <div className="header-brand">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="brand-content">
            <h1 className="app-title">{title}</h1>
            <span className="app-subtitle">Agricultural Supply Chain</span>
          </div>
        </div>

        {/* Right Section - User Info and Actions */}
        <div className="header-actions">
          <div className="user-info">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="user-details">
              <span className="user-name">{user?.name || 'User'}</span>
              <span className="user-role">{user?.role ? user.role.charAt(0) + user.role.slice(1).toLowerCase() : 'Member'}</span>
            </div>
          </div>
          
          <div className="action-separator"></div>

          {/* Cart Button — opens drawer instead of navigating */}
          {(user?.role === "CUSTOMER" || user?.role === "RETAILER") && onCartOpen && (
            <button
              className="cart-header-btn"
              onClick={onCartOpen}
              aria-label={`Open cart, ${itemCount} items`}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Cart
              {itemCount > 0 && (
                <span className="cart-count-bubble" key={itemCount}>{itemCount}</span>
              )}
            </button>
          )}
            
          <button className="logout-btn" onClick={onLogout}>
            <svg className="logout-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;