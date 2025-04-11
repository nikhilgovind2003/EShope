# 🛒 eShop - MERN Stack Ecommerce App

`eShop` is a full-stack eCommerce application built with the MERN stack (MongoDB, Express, React, Node.js). It features user authentication, product management.

## 📘 Project Overview

`eShop` is a full-featured eCommerce web application built using the **MERN stack** (MongoDB, Express.js, React, and Node.js). The goal was to create a scalable and responsive online shopping platform where users can browse products, edit the product, and delete the product.

## 🧠 Approach

The application was designed with a **RESTful API architecture**, separating the frontend and backend logic for clean code organization. Authentication was handled using **JWT**, and MongoDB was used to store product, user, and order data. The frontend leverages **React** for a smooth SPA experience with **React Router** and **Context API** for state management.


## 🧱 Tech Stack

- **Frontend**: React, React Router, Axios, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Other Tools**: Bcrypt, Dotenv, Multer


## ⚠️ Challenges Faced

- **JWT Token Expiry Handling**: Implementing secure and smooth token-based login with proper logout and protected routes.
- **Image Uploads**: Handling image upload using Multer.
- **Responsive UI**: Ensuring the application looks good and functions well on all screen sizes.
- **Filtering**: Making an efficient product filter system using query params on the backend.

---

## 🛠️ Installation & Setup

### 1. Set up the Backend

```bash
cd server
npm init -y
npm install
```

Start the backend server:

```bash
npm run dev
```

### 2. Set up the Frontend

```bash
cd ../client
npm create vite@latest
npm install
```

Start the client:

```bash
npm run dev
```
