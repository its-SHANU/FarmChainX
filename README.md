<p align="center">
  <img src="https://img.shields.io/badge/FarmChainX-🌾-2c5530?style=for-the-badge&labelColor=1a3320" alt="FarmChainX" />
</p>

<h1 align="center">🌾 FarmChainX</h1>

<p align="center">
  <strong>A Full-Stack Agricultural Supply Chain Management Platform</strong><br/>
  Connecting Farmers, Retailers, and Customers — from farm to fork.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.1-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Spring_Boot-3.5-6DB33F?style=flat-square&logo=springboot&logoColor=white" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Vite-7.2-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Java-21-ED8B00?style=flat-square&logo=openjdk&logoColor=white" alt="Java 21" />
  <img src="https://img.shields.io/badge/Python-Flask-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python Flask" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />
</p>

---

## 📋 Table of Contents

- [About](#-about)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#1-backend-setup-spring-boot)
  - [Frontend Setup](#2-frontend-setup-react--vite)
  - [Chatbot Setup](#3-chatbot-setup-python-flask)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [User Roles](#-user-roles)
- [Screenshots](#-screenshots)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌱 About

**FarmChainX** is a comprehensive agricultural supply chain management platform that bridges the gap between farmers, retailers, and end customers. It provides role-based dashboards, product traceability via QR codes, AI-powered chatbot assistance, fruit quality classification using ML, and real-time analytics — all within a modern, secure web application.

The platform ensures transparency in the agricultural supply chain by allowing farmers to list products with detailed metadata (crop type, soil type, pesticides used, harvest dates), while customers and retailers can browse, purchase, rate, and trace the origin of every product.

---

## ✨ Key Features

### 👨‍🌾 Farmer Dashboard
- **Product Management** — Add, edit, and delete agricultural products with images
- **QR Code Generation** — Generate scannable QR codes for product traceability and authenticity
- **Inventory Reports** — Track stock levels, low-stock alerts, and inventory valuation
- **Sales Overview** — Revenue analytics, top-selling products, and performance metrics
- **AI Chatbot** — Farming assistant powered by Groq LLaMA 3.3 for agricultural advice
- **Fruit Classifier** — ML-powered image classification for fruit quality assessment

### 🛒 Customer Dashboard
- **Product Browsing** — Search, filter, and explore available farm products
- **Shopping Cart** — Add products to cart with quantity management and checkout flow
- **Product Ratings & Reviews** — Rate and review purchased products
- **Product Traceability** — Scan QR codes to verify product origin and authenticity

### 🏪 Retailer Dashboard
- **Wholesale Browsing** — Browse products with retailer-specific cart and bulk ordering
- **Order Management** — Manage bulk purchases from farmers

### 🔐 Admin Dashboard
- **User Management** — View user statistics and role-based distribution
- **Product Analytics** — Monitor all products across the platform
- **Purchase Analytics** — Track transaction data and purchase trends
- **System Metrics** — Real-time system health, activity logs, and performance metrics
- **Rating Moderation** — Review and moderate customer ratings/comments

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client (Browser)                         │
│                    React 19 + Vite + React Router                │
└────────────┬───────────────────────────┬────────────────────────┘
             │  REST API (JWT Auth)       │  REST API
             ▼                            ▼
┌────────────────────────┐   ┌────────────────────────────────────┐
│   Spring Boot Backend  │   │      Python Flask Chatbot Server   │
│  (Java 21 / Port 8080) │   │      (Groq LLaMA 3.3 / Port 5000) │
│                        │   │                                    │
│  • Auth (JWT + BCrypt) │   │  • AI Chat (Groq API)              │
│  • Product CRUD        │   │  • Text-to-Speech (gTTS)           │
│  • Ratings System      │   │  • Audio Transcription (Whisper)   │
│  • Admin Analytics     │   │  • Database Queries (MySQL)        │
│  • File Upload/Storage │   └────────────────────────────────────┘
└────────────┬───────────┘
             │                  ┌─────────────────────────────────┐
             ▼                  │    Hugging Face API (External)   │
┌────────────────────────┐      │  • Fruit Image Classification   │
│    MongoDB Atlas        │      └─────────────────────────────────┘
│  (Cloud Database)       │
│                        │
│  • users collection    │
│  • products collection │
│  • ratings collection  │
│  • purchases collection│
│  • activities collection│
└────────────────────────┘
```

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI component library |
| **Vite 7** | Build tool and dev server |
| **React Router v7** | Client-side routing |
| **Axios** | HTTP client for API calls |
| **react-qr-code** | QR code generation for product traceability |
| **CSS3** | Custom styling with modern design system |

### Backend
| Technology | Purpose |
|---|---|
| **Spring Boot 3.5** | REST API framework |
| **Java 21** | Server-side language |
| **Spring Security** | Authentication & authorization |
| **JWT (jjwt 0.11.5)** | Stateless token-based auth |
| **Spring Data MongoDB** | Database ORM |
| **Lombok** | Boilerplate code reduction |
| **Jackson** | JSON serialization with JSR-310 date support |

### AI / ML Services
| Technology | Purpose |
|---|---|
| **Groq API (LLaMA 3.3 70B)** | AI-powered farming chatbot |
| **Whisper Large V3 Turbo** | Audio transcription for voice chat |
| **gTTS (Google Text-to-Speech)** | Voice responses from chatbot |
| **Hugging Face** | Fruit image classification model |
| **Flask** | Lightweight Python web server for chatbot |

### Database & Infrastructure
| Technology | Purpose |
|---|---|
| **MongoDB Atlas** | Cloud-hosted NoSQL database |
| **Docker** | Containerized backend deployment |
| **Render** | Backend hosting (cloud) |
| **Vercel** | Frontend hosting (cloud) |

---

## 📁 Project Structure

```
FarmChainX/
├── 📂 Farmchainx_Backend-main/            # Spring Boot API Server
│   ├── 📂 src/main/java/com/farmchainx/farmchainx/
│   │   ├── 📄 FarmchainxApplication.java   # Application entry point
│   │   ├── 📂 config/
│   │   │   ├── 📄 SecurityConfig.java      # CORS, JWT filter, route security
│   │   │   ├── 📄 JwtAuthFilter.java       # JWT authentication filter
│   │   │   ├── 📄 JwtUtil.java             # Token generation & validation
│   │   │   ├── 📄 PasswordConfig.java      # BCrypt password encoder
│   │   │   ├── 📄 DataInitializer.java     # Seed data on startup
│   │   │   ├── 📄 JacksonConfig.java       # Date/time serialization
│   │   │   └── 📄 MongoIdCallback.java     # Auto-increment IDs for MongoDB
│   │   ├── 📂 controller/
│   │   │   ├── 📄 AuthController.java      # Login & registration endpoints
│   │   │   ├── 📄 ProductController.java   # Product CRUD operations
│   │   │   ├── 📄 RatingController.java    # Product rating endpoints
│   │   │   ├── 📄 AdminController.java     # Admin analytics endpoints
│   │   │   └── 📄 FileController.java      # File upload/download
│   │   ├── 📂 model/
│   │   │   ├── 📄 User.java               # User entity (FARMER, CUSTOMER, RETAILER, ADMIN)
│   │   │   ├── 📄 Product.java            # Product entity with farmer reference
│   │   │   ├── 📄 Rating.java             # Product rating entity
│   │   │   ├── 📄 Purchase.java           # Purchase transaction entity
│   │   │   ├── 📄 Activity.java           # System activity log entity
│   │   │   ├── 📄 ProductAnalytics.java   # Product analytics DTO
│   │   │   ├── 📄 PurchaseAnalytics.java  # Purchase analytics DTO
│   │   │   └── 📄 DatabaseSequence.java   # Auto-increment sequence helper
│   │   ├── 📂 repository/                 # MongoDB repository interfaces
│   │   ├── 📂 service/                    # Business logic layer
│   │   └── 📂 exception/                  # Custom exception handlers
│   ├── 📂 src/main/resources/
│   │   └── 📄 application.properties      # App configuration
│   ├── 📄 Dockerfile                      # Multi-stage Docker build
│   ├── 📄 pom.xml                         # Maven dependencies
│   └── 📂 uploads/                        # Product image storage
│
├── 📂 Farmchainx_Frontend-main/           # React SPA
│   ├── 📂 src/
│   │   ├── 📄 App.jsx                     # Root component with routing
│   │   ├── 📄 main.jsx                    # React DOM entry point
│   │   ├── 📂 components/
│   │   │   ├── 📂 FarmerDashboard/        # Farmer role dashboard
│   │   │   ├── 📂 CustomerDashboard/      # Customer dashboard + cart + checkout
│   │   │   ├── 📂 RetailerDashboard/      # Retailer dashboard + bulk cart
│   │   │   ├── 📂 AdminDashboard/         # Admin panel + analytics components
│   │   │   ├── 📂 Form/                   # Product creation form (farmer)
│   │   │   ├── 📂 QRcode/                 # QR code generator & report builder
│   │   │   ├── 📂 InventoryReport/        # Stock tracking & inventory analytics
│   │   │   ├── 📂 SalesOverview/          # Revenue & sales analytics
│   │   │   ├── 📂 Login/                  # Authentication login page
│   │   │   ├── 📂 Register/               # User registration page
│   │   │   └── 📂 Shared/                 # Reusable components (Header, ProductTable, etc.)
│   │   ├── 📂 pages/
│   │   │   ├── 📄 chatbot.jsx             # AI chatbot interface
│   │   │   ├── 📄 FarmerChatbot.jsx       # Farmer-specific chatbot page
│   │   │   └── 📄 FruitClassifier.jsx     # ML fruit classification modal
│   │   ├── 📂 context/                    # React context (Cart state management)
│   │   ├── 📂 services/
│   │   │   └── 📄 api.js                  # Centralized API service (singleton)
│   │   └── 📂 styles/                     # Global & component-level CSS
│   ├── 📂 chatbot backend/                # Python chatbot microservice
│   │   └── 📂 backend/
│   │       └── 📄 chatbot_server.py       # Flask server with Groq AI integration
│   ├── 📄 package.json
│   ├── 📄 vite.config.js
│   └── 📄 index.html
│
├── 📄 LICENSE                              # MIT License
└── 📄 README.md                            # You are here!
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

| Tool | Version | Download |
|---|---|---|
| **Java JDK** | 21+ | [Download](https://adoptium.net/) |
| **Maven** | 3.9+ | [Download](https://maven.apache.org/) |
| **Node.js** | 18+ | [Download](https://nodejs.org/) |
| **Python** | 3.9+ | [Download](https://python.org/) |
| **MongoDB Atlas** | Cloud | [Sign Up](https://www.mongodb.com/atlas) |
| **Git** | Latest | [Download](https://git-scm.com/) |

### 1. Backend Setup (Spring Boot)

```bash
# Clone the repository
git clone https://github.com/its-SHANU/FarmChainX.git
cd FarmChainX/Farmchainx_Backend-main

# Set your MongoDB connection string
# Option A: Environment variable
export SPRING_DATA_MONGODB_URI="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/farmchainx"

# Option B: Edit application.properties directly
# src/main/resources/application.properties

# Build and run
./mvnw clean install -DskipTests
./mvnw spring-boot:run
```

> The backend will start on **http://localhost:8080**

### 2. Frontend Setup (React + Vite)

```bash
# Navigate to the frontend directory
cd FarmChainX/Farmchainx_Frontend-main

# Install dependencies
npm install

# Start the development server
npm run dev
```

> The frontend will start on **http://localhost:5173**

### 3. Chatbot Setup (Python Flask)

```bash
# Navigate to the chatbot backend
cd FarmChainX/Farmchainx_Frontend-main/chatbot\ backend/FarmChainX_Frontend-main/backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install flask flask-cors groq gtts python-dotenv mysql-connector-python

# Set your Groq API key in the script or via environment variable
# Edit chatbot_server.py and replace "API_KEY" with your actual Groq API key

# Run the chatbot server
python chatbot_server.py
```

> The chatbot server will start on **http://127.0.0.1:5000**

---

## 🔐 Environment Variables

### Backend (`application.properties`)

| Variable | Description | Required |
|---|---|---|
| `SPRING_DATA_MONGODB_URI` | MongoDB Atlas connection string | ✅ |
| `jwt.secret` | Secret key for JWT token signing | ✅ (default provided) |
| `jwt.expiration` | JWT token expiry time in ms (default: 86400000 = 24h) | ✅ |
| `admin.registration.key` | Secret key required for admin registration | ✅ |
| `PORT` | Server port (default: 8080) | ❌ |

### Chatbot (`chatbot_server.py`)

| Variable | Description | Required |
|---|---|---|
| Groq API Key | API key for Groq LLaMA 3.3 model | ✅ |
| MySQL Credentials | Database host, user, password, database name | ✅ |

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login and receive JWT token | ❌ |

### Products

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/products` | Get all products | ✅ |
| `POST` | `/api/products` | Create a new product (multipart) | ✅ Farmer |
| `PUT` | `/api/products/:id` | Update a product | ✅ |
| `DELETE` | `/api/products/:id` | Delete a product | ✅ |
| `GET` | `/api/products/my-products` | Get current farmer's products | ✅ Farmer |

### Ratings

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/products/:id/ratings` | Add rating to a product | ✅ |
| `GET` | `/api/products/:id/ratings` | Get ratings for a product | ✅ |
| `GET` | `/api/products/ratings` | Get all ratings (admin) | ✅ |
| `DELETE` | `/api/products/ratings/:id` | Delete a rating | ✅ |

### Admin

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/admin/users/stats` | Get user statistics | ✅ Admin |
| `GET` | `/api/admin/analytics/purchases` | Get purchase analytics | ✅ Admin |
| `GET` | `/api/admin/analytics/products` | Get product analytics | ✅ Admin |
| `GET` | `/api/admin/analytics/metrics` | Get system metrics | ✅ Admin |
| `GET` | `/api/admin/activities/recent` | Get recent activities | ✅ Admin |
| `GET` | `/api/admin/ratings` | Get all ratings | ✅ Admin |
| `DELETE` | `/api/admin/ratings/:id` | Delete a rating | ✅ Admin |
| `GET` | `/api/admin/overview` | Get system overview | ✅ Admin |

### Chatbot (Flask)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/chat` | Send a message and receive AI-generated response with audio |

---

## 👥 User Roles

FarmChainX implements **role-based access control (RBAC)** with four distinct user types:

| Role | Access Level | Key Capabilities |
|---|---|---|
| 🌾 **Farmer** | Product Owner | Add/manage products, generate QR codes, view sales & inventory reports, access AI chatbot & fruit classifier |
| 🛒 **Customer** | Buyer | Browse products, add to cart, checkout, rate & review products |
| 🏪 **Retailer** | Wholesale Buyer | Browse products, bulk ordering with dedicated cart |
| 🔐 **Admin** | Full Access | User management, analytics dashboards, rating moderation, system metrics |

> **Note:** Admin registration requires a secret registration key for security.

---

## 📸 Screenshots

> _Coming soon — Screenshots of the Farmer Dashboard, Customer Marketplace, Admin Analytics Panel, QR Code Generator, and AI Chatbot will be added here._

---

## 🚢 Deployment

### Backend — Docker + Render

The backend includes a multi-stage Dockerfile for production deployment:

```bash
# Build and run with Docker
docker build -t farmchainx-backend .
docker run -p 8080:8080 \
  -e SPRING_DATA_MONGODB_URI="your_mongodb_uri" \
  farmchainx-backend
```

**Live Backend:** Deployed on [Render](https://render.com) at `https://farmchainx-joq1.onrender.com`

### Frontend — Vercel

```bash
# Build for production
cd Farmchainx_Frontend-main
npm run build

# Deploy the dist/ folder to Vercel
```

**Live Frontend:** Deployed on [Vercel](https://vercel.com)

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes
   ```bash
   git commit -m "feat: add amazing feature"
   ```
4. **Push** to your branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Purpose |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation only |
| `style:` | Code style (formatting, etc.) |
| `refactor:` | Code restructuring |
| `test:` | Adding tests |
| `chore:` | Maintenance tasks |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

```
MIT License © 2025 Shantanu Lokhande
```

---

<p align="center">
  Made with 💚 by <a href="https://github.com/its-SHANU">Shantanu Lokhande</a>
</p>

<p align="center">
  <a href="https://github.com/its-SHANU/FarmChainX/issues">Report Bug</a> •
  <a href="https://github.com/its-SHANU/FarmChainX/issues">Request Feature</a>
</p>
