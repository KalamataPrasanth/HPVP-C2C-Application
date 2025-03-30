# HPVP C2C Application

## 📌 Overview
The **HPVP C2C Application** is a customer-to-customer (C2C) platform that allows users to buy and sell products directly. Built with **React (Vite) for frontend** and **Node.js with Express for backend**, it offers a seamless and secure marketplace experience.

## 🚀 Features
- **User Authentication** – Secure login and registration using **JWT (JSON Web Tokens)**
- **Product Listing & Management** – Users can add, edit, and delete product listings
- **Filter option** – Find products easily using the category wise finter
- **Image Uploads** – Upload product images using **Multer**
- **Database Integration** – Uses **MongoDB (Mongoose)** for storing user and product data
- **Secure Password Handling** – Passwords are encrypted using **bcrypt**
- **Cross-Origin Support** – Enabled via **CORS** middleware for seamless frontend-backend interaction

---

## 🛠️ Installation Guide

### 🔹 Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

### 🔹 Setup Instructions
#### 1️⃣ Clone the Repository
```sh
git clone <your-github-repo-url>
cd HPVP-Project
```
#### 2️⃣ Install Dependencies
```sh
# Install backend dependencies
npm install
```
📦 **Key Backend Libraries:**  
| Library       | Purpose |
|--------------|---------|
| `bcryptjs`   | Password hashing |
| `cors`       | Enables cross-origin requests |
| `crypto-js`  | Encryption and hashing functions |
| `dotenv`     | Manages environment variables |
| `express`    | Web framework for handling API routes |
| `jsonwebtoken` | JWT-based authentication |
| `mongoose`   | ODM (Object Data Modeling) for MongoDB |
| `multer`     | Handles file uploads |
| `nodemon`    | Automatically restarts the server during development |

```sh
# Navigate to frontend and install dependencies
cd frontend
npm install
```
📦 **Key Frontend Libraries:**  
- `react-router-dom` – Routing  
- `axios` – API calls
- `crypto-js` - Encryption and hashing functions

#### 3️⃣ Set Up Environment Variables
Create a `.env` file in the **root** directory and add:
```
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
```

#### 4️⃣ Run the Project
```sh
# Start the backend server
npm start

# In another terminal, start the frontend
cd frontend
npm run dev
```

---

## 📌 Project Structure
```
HPVP-Project/
│-- backend/
│   ├── models/        # Mongoose models
│   ├── routes/        # Express routes
│   ├── controllers/   # Business logic
│   ├── middleware/    # Authentication & validation
│-- frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│-- .gitignore
│-- package.json
│-- README.md
```

---

## 📡 API Documentation
### 🔹 Authentication
#### `POST /api/auth/register`
- **Description**: Registers a new user.
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```
- **Response**:
```json
{
  "token": "your-jwt-token"
}
```

### 🔹 Product Management
#### `GET /api/products`
- **Description**: Fetch all products.
- **Response**:
```json
[
  {
    "_id": "12345",
    "name": "Product Name",
    "price": 100
  }
]
```

---

## 🌍 Deployment Guide
### 🔹 Deploying to Heroku (Backend)
1. Create a Heroku app:
   ```sh
   heroku create hpvp-c2c-backend
   ```
2. Push the code:
   ```sh
   git push heroku main
   ```

### 🔹 Deploying Frontend (Netlify/Vercel)
- **Netlify**: 
  1. Run `npm run build`
  2. Upload `dist/` folder to Netlify

- **Vercel**:
  ```sh
  vercel deploy
  ```

---

## 🤝 Contributing
Feel free to submit issues or pull requests on GitHub!

---

## ❓ FAQs
**Q: How do I reset my password?**
A: Use the `POST /api/auth/reset` endpoint with your email.

**Q: Can I deploy this on a VPS?**
A: Yes! Use **PM2** for backend and **Nginx** for reverse proxy.

---

💡 **Need more help?** Open an issue on GitHub!
