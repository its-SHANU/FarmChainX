// components/RetailerDashboard/RetailerDashboard.jsx
import React, { useState, useEffect, useMemo } from "react";
import Header from "../Shared/Header";
import ProductTable from "../Shared/ProductTable";
import RatingModal from "../Shared/RatingModal";
import SearchSection from "../Shared/SearchSection";
import CartDrawer from "../CustomerDashboard/CartDrawer";
import "../../styles/components/dashboard.css";
import { RetailerCartProvider } from "../../context/RetailerCartContext";
import { useRetailerCart } from "../../context/RetailerCartContext";



function RetailerDashboard({ onLogout }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  // const { addToCart } = useRetailerCart();

  

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${window.API_BASE_URL}/api/products`, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  //handle logout
  const handleLogout = () => {
  localStorage.clear();     // remove token & user
  window.location.href = "/login"; // redirect
};

  // Handle Rating
  const handleRateProduct = (product) => {
    setSelectedProduct(product);
    setShowRatingModal(true);
  };

  const handleSubmitRating = async (productId, rating, comment) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${window.API_BASE_URL}/api/products/${productId}/ratings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({
            stars: rating,
            comment,
          }),
        }
      );
      if (!response.ok) throw new Error("Failed to submit rating");

      const savedRating = await response.json();
      alert("Rating submitted successfully!");

      // Refresh product list to update average rating
      await fetchProducts();
    } catch (err) {
      console.error("Error submitting rating:", err);
      alert("Failed to submit rating. Please try again.");
    }
  };

  // Handle Purchase
const handlePurchaseProduct = (product) => {
  alert(`Purchase order created for: ${product.name}`);
};
  // Filter products by search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    return products.filter((p) =>
      [p.name, p.cropType, p.location]
        .filter(Boolean)
        .some((field) =>
          field.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }, [products, searchQuery]);

  // Calculate statistics
  const stats = useMemo(() => ({
    totalProducts: products.length,
    availableProducts: products.filter(p => p.quantity > 0).length,
    averageRating: products.length > 0 
      ? (products.reduce((sum, p) => sum + (p.averageRating || 0), 0) / products.length).toFixed(1)
      : 0,
    totalFarmers: new Set(products.map(p => p.farmer)).size
  }), [products]);

  // Table Columns
  const retailerColumns = [
    {
      key: "imageUrl",
      title: "Image",
      render: (product) => (
        <div className="product-image-container">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div className="no-image-placeholder" style={{ display: product.imageUrl ? 'none' : 'flex' }}>
            <span>🌱</span>
          </div>
        </div>
      ),
    },
    { 
      key: "name", 
      title: "Product Name",
      render: (product) => (
        <div className="product-name-cell">
          <div className="product-name">{product.name}</div>
          <div className="product-price">₹{product.price?.toFixed(2) || 'N/A'}</div>
        </div>
      )
    },
    { 
      key: "cropType", 
      title: "Crop Type",
      render: (product) => (
        <div className="crop-badge">{product.cropType}</div>
      )
    },
    { 
      key: "location", 
      title: "Location",
      render: (product) => (
        <div className="location-text">
          <span className="location-icon">📍</span>
          {product.location || 'Not specified'}
        </div>
      )
    },
    {
      key: "harvestDate",
      title: "Harvest Date",
      render: (product) => (
        <div className="date-display">
          {product.harvestDate
            ? new Date(product.harvestDate).toLocaleDateString()
            : <span className="not-available">N/A</span>}
        </div>
      ),
    },
    {
      key: "quantity",
      title: "Available Qty",
      render: (product) => (
        <div className="quantity-display">
          <div className="quantity-value">{product.quantity || 0} kg</div>
          <div className={`quantity-status ${(product.quantity || 0) > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {(product.quantity || 0) > 0 ? 'In Stock' : 'Out of Stock'}
          </div>
        </div>
      ),
    },
    {
      key: "averageRating",
      title: "Quality Rating",
      render: (product) => (
        <div className="rating-display">
          {product.averageRating ? (
            <>
              <div className="rating-stars">
                {'⭐'.repeat(Math.round(product.averageRating))}
              </div>
              <div className="rating-value">{product.averageRating.toFixed(1)}/5.0</div>
            </>
          ) : (
            <div className="no-rating">Not rated</div>
          )}
        </div>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      render: (product) => (
        <div className="action-buttons">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => handlePurchaseProduct(product)}
            disabled={(product.quantity || 0) === 0}
          >
            🛒 Purchase Bulk
          </button>
          {/* <button
            className="btn btn-outline btn-sm"
            onClick={() => handleRateProduct(product)}
          >
            ⭐ Rate Quality
          </button> */}
        </div>
      ),
    },
  ];

  return (
    <RetailerCartProvider>
    <div className="dashboard retailer-dashboard">
      <Header
        title="FarmChainX - Retailer Dashboard"
        user={JSON.parse(localStorage.getItem("user"))}
        onLogout={onLogout}
        onCartOpen={() => setIsCartOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        user={JSON.parse(localStorage.getItem("user"))}
      />

      <div className="container">
        <div className="dashboard-content">
          {/* Dashboard Header */}
          <div className="dashboard-header">
            <div className="header-content">
              <div className="header-text">
                <h1>Wholesale Marketplace</h1>
                <p>Purchase farm-fresh products in bulk for your retail business</p>
              </div>
              <div className="header-actions">
                <button 
                  className="btn btn-outline btn-refresh"
                  onClick={fetchProducts}
                  disabled={isLoading}
                >
                  {isLoading ? '🔄 Loading...' : '🔄 Refresh'}
                </button>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-icon">📦</div>
              <div className="stat-content">
                <div className="stat-number">{stats.totalProducts}</div>
                <div className="stat-label">Total Products</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <div className="stat-number">{stats.availableProducts}</div>
                <div className="stat-label">Available Now</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-content">
                <div className="stat-number">{stats.averageRating}</div>
                <div className="stat-label">Avg Rating</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👨‍🌾</div>
              <div className="stat-content">
                <div className="stat-number">{stats.totalFarmers}</div>
                <div className="stat-label">Active Farmers</div>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="search-section-wrapper">
            <SearchSection
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={() => {}}
              placeholder="Search products by name, crop type, or location..."
            />
            {searchQuery && (
              <button 
                className="btn btn-outline btn-clear"
                onClick={() => setSearchQuery('')}
              >
                Clear
              </button>
            )}
          </div>

          {/* Products Section */}
          <div className="products-section">
            <div className="section-header">
              <h3>Available Products</h3>
              <div className="results-count">
                {filteredProducts.length} of {products.length} products
                {searchQuery && ` matching "${searchQuery}"`}
              </div>
            </div>

            {isLoading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🌾</div>
                <h4>No products found</h4>
                <p>
                  {searchQuery 
                    ? 'No products match your search criteria. Try adjusting your search terms.'
                    : 'No products are currently available in the marketplace.'
                  }
                </p>
                {searchQuery && (
                  <button 
                    className="btn btn-outline"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear Search
                  </button>
                )}
              </div>
            ) : (
              <div className="table-container">
                <ProductTable 
                  products={filteredProducts} 
                  columns={retailerColumns}
                  title="Marketplace Products"
                />
              </div>
            )}
          </div>

          {showRatingModal && selectedProduct && (
            <RatingModal
              product={selectedProduct}
              onClose={() => setShowRatingModal(false)}
              onSubmitRating={handleSubmitRating}
            />
          )}
        </div>
      </div>
    </div>
    </RetailerCartProvider>
  );
}

export default RetailerDashboard;