🛒 E-Commerce REST API (Enhanced Version)

This project is an improved and expanded version of my previous e-commerce backend.
It is built using Node.js, Express, and Sequelize ORM, with a strong focus on clean architecture, validation, testing, and secure authentication.

The project is actively evolving as I continue adding new modules and refining the API structure.

🚀 Features

✅ Users Module (Completed)

Full CRUD operations

Sequelize ORM for database interactions

JWT authentication for secure access

bcrypt for password hashing

Express Validator for input validation

Clean and modular controller–route structure

✅ Brands, Categories & Subcategories Modules

Full CRUD operations

Sequelize ORM integration

Input validation using Express Validator

Controllers implemented using Factory Pattern for reusable and scalable REST APIs

End-to-End testing for all modules

🧪 End-to-End Testing

Implemented using:

Mocha

Chai

Axios

Covers:

User registration & login flows

JWT token handling

CRUD operations for Users, Brands, Categories, and Subcategories

🛠 Architecture

RESTful API structure

Organized routes, controllers, models, and middlewares

Environment variables managed with dotenv

Centralized error-handling middleware

Factory pattern for reusable controllers

🔧 Tech Stack

Node.js

Express.js

MySQL (via Sequelize ORM)

JWT

bcrypt

Express Validator

Mocha + Chai + Axios (E2E testing)

📌 Roadmap

🔄 Product Module (CRUD)

🛒 Cart & Orders Module

🔐 Role-based Authorization

🧾 Logging & Monitoring

📦 Deployment (Render / Railway / Docker)

🤝 Contributions

This is a learning and improvement project.
Contributions, suggestions, and feedback are welcome!

# 🚀 How to Run the API Server

## 1️⃣ Clone the Repository 

```
git clone https://github.com/abuomerSD/e-shop-server.git
```
then switch the directory to server
``` 
cd ./server
```

## 2️⃣ Install TypeScript

```
npm install typescript
```

## 3️⃣ Compile TypeScript

```javascript
tsc
```

## 4️⃣ Create a .env File

```
# server port
PORT = 5000

# NODE_ENV
NODE_ENV = development

# database
DB_NAME = Eshop
DB_USER = root1
DB_PASSWORD = rootroot
DB_HOST = localhost
DB_DIALECT = mysql

# testing
API_TEST_URL = http://localhost:5000/api/v1

# jwt
JWT_SECRET = 4c446580dc786536f9193324e353d831637faac161d3779c8853e852c8d44fac07cffbff2917c38be87c9e344252d7687bca985a84398f1c780d4988d2a80581
```

## 5️⃣ Install & Configure MySQL

- Install MySQL on your machine.
- Create a database with the same name as DB_NAME in your .env file (example: Eshop).

## 6️⃣ Run the Server

```
node ./dist/src/app.js
```
