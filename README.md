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
| Library            | Purpose    |
|--------------------|------------|
| `react-router-dom` | Routing    |
| `axios`            | API calls  |
| `crypto-js`        | Encryption and hashing functions |

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
|   ├── config/           # Databsse configuration
│   ├── controllers/      # Business logic for routes
│   ├── middleware/       # Authentication, validation  and image upload middleware
│   ├── models/           # Mongoose models (User, Products and wishlisted items)
│   ├── routes/           # Express routes
│   ├── server.js         # Main entry point for the backend server
│-- frontend/
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── api/          # Frontend API handler
│   │   ├── assets/       # static assets
│   │   ├── components/   # Reusable UI components (Navbar, Footer, Message handling and Login component)
│   │   ├── pages/        # Page-level components (Landing, Home, Services, Buy, Sell, Wish, FAQ)
│   │   ├── App.jsx       # Root React component
│   │   ├── main.jsx      # Entry point for frontend
│   ├── .env.local        # Frontend environment variables
│   ├── index.html        # HTML template
│   ├── vite.config.js    # Vite configuration
├── uploads/              # Uploaded product images
│-- .gitignore            # Files to be ignored in version control
│-- package.json          # Dependencies and scripts
│-- loadTest.js           # Load test script
│-- README.md             # Project documentation
```

---

## 📡 API Documentation
### 🔹 Authentication
#### `POST /api/auth/login`
- **Description**: Logs in a user and returns a JWT Token.
- **Request Body**:
```json
{
  "staffno": "xxxxxxx",
  "password": "securepassword"
}
```
- **Response (on Success)**:
```json
{
  "token": "your-jwt-token",
  "name" : "name-corresponding-to-the-staffno",
  "staffno": "your-staff-number"
}
```

- **Response (on Failure)**:
```json
{
  "message": "Invalid Credentials"
}
```

### 🔹 Product Management
#### `GET /api/products`
- **Description**: Fetch all products.
- **Response (on Success)**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "12345",
      "name": "Product Name",
      "price": 100,
      "description": "Product description",
      "seller": {
        "_id": "60f7c6f5d6a3b51a847b6a23",
        "name": "seller name",
        "staffno": "xxxxxxx",
        "telephone": "xxxx",
        "mobile": "9876543210",
        "address": "seller address",
        "email": "sellremail@email.com"
      },
      "image": "http://localhost:5000/uploads/image.jpg"
    }
  ]
}
```
- **Response (on Failure)**
```json
  {
    "success": false,
    "message": "Product Not found"
  }
```

#### `POST /api/products`
- **Description**: Creates a new product listing.
- **Request body (form-data)**:
  | Field        | Type     | Required | Description |
  |-------------|---------|----------|-------------|
  | `name`      | String  |  Yes  | Product name |
  | `price`     | Number  |  Yes  | Product price |
  | `description` | String |  Yes | Product details |
  | `staffno`   | String  |  Yes  | Seller's staff number |
  | `image`     | File    |  No  | Product image (uploaded file) |
  
- **Response (on Successs)**
```json
{
  "success": true,
  "data": {
    "_id": "12345",
    "name": "Product Name",
    "price": 100,
    "description": "Product description",
    "seller": "60f7c6f5d6a3b51a847b6a23",
    "image": "http://localhost:5000/uploads/image.jpg"
  }
}
```
- **Response (on Failure)**
```json
  {
    "success": false,
    "message": "Invalid Seller, Employee does not exist."
  }
```
#### `DELETE /api/products/:id`
- **Description**: Deletes a product by id.
- **Response (on Success)**:
```json
{
  "message": "Product deleted Successfully"
}
```

- **Response (on Failure)**:
```json
{
  "message": "Product not found"
}
```

#### `PUT /api/products/:id`
- **Description**: Updates an existing field.
- **Request Body (form data):**
  optional Fields: name, price, description
- **Response (on Success)**:
```json
{
  "message": "Product deleted Successfully"
}
```

- **Response (on Failure)**:
```json
{
  "message": "Product not found"
}
```
