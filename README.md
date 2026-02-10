# 🌍 WanderLust

WanderLust is a full-stack web application inspired by Airbnb that allows users to explore, search, and list unique accommodations across different locations. The application is built using Node.js, Express, MongoDB Atlas, and EJS, with secure authentication and session management.

---

## 🚀 Live Demo
👉 https://your-render-app-url.onrender.com/listings

---

## 🛠 Tech Stack

### Backend
- **Node.js**
- **Express.js (v4.19.2)**
- **MongoDB Atlas**
- **Mongoose**

### Frontend
- **EJS**
- **EJS-Mate (layout engine)**
- **Bootstrap 5**

### Authentication & Security
- **Passport.js**
- **passport-local**
- **passport-local-mongoose**
- **express-session**
- **connect-mongo**
- **connect-flash**
- **Joi (data validation)**

### File Upload & Media
- **Multer**
- **Cloudinary**
- **multer-storage-cloudinary**

### Maps & Location
- **Mapbox SDK**

### Utilities
- **dotenv**
- **method-override**

---

## ✨ Features

- User authentication (Sign up, Login, Logout)
- Secure session storage using MongoDB Atlas
- Create, edit, and delete property listings
- Image upload and storage using Cloudinary
- Search listings by title, location, country, or category
- Category-based listing filtering
- Flash messages for success and error feedback
- Responsive user interface using Bootstrap
- Server-side data validation using Joi

---

## 🔍 Search Functionality

The search feature allows users to find listings using keywords.  
Search is **case-insensitive** and works across:

- Title
- Location
- Country
- Category

The search input is globally available in the navbar and safely handled using `res.locals` to avoid rendering issues.

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/wanderlust.git
cd wanderlust
