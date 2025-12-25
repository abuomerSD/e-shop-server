# EShop API
##### RESTful API built with Node.js, Express, and MySQL

### Description
This project is an improved and expanded version of my previous e-commerce backend.
- It is built using Node.js, Express, and Sequelize ORM, with a strong focus on clean architecture, validation, testing, and secure authentication.
- The project is actively evolving as I continue adding new modules and refining the API structure.

## Tech Stack
- TypeScript
- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JWT Authentication
- Express Validator for request validation
- Nodemailer for sending emails
- Mocha & Chai for E2E Testing

## Features
- User authentication & authorization (JWT)
- CRUD operations
- Pagination & sorting and search
- Role-based access control
- RESTful API structure
- Online Payments Using Moyasar

## Project Structure
 The project follows a modular and scalable architecture.
```
src/
├── app.ts
├── config
│   ├── env.config.ts
│   └── sequelize.config.ts
├── controllers
│   ├── auth.controller.ts
│   ├── brand.controller.ts
│   ├── cart.controller.ts
│   ├── category.controller.ts
│   ├── controllerFactory.ts
│   ├── coupon.controller.ts
│   ├── order.controller.ts
│   ├── product.controller.ts
│   ├── review.controller.ts
│   ├── subCategory.controller.ts
│   └── user.controller.ts
├── middlewares
│   ├── auth.ts
│   ├── errorHandler.ts
│   ├── resizeImage.ts
│   ├── uploadImage.ts
│   └── validatorMiddleware.ts
├── models
│   ├── brand.model.ts
│   ├── cartItems.model.ts
│   ├── cart.model.ts
│   ├── category.model.ts
│   ├── coupon.model.ts
│   ├── index.ts
│   ├── orderItems.model.ts
│   ├── order.model.ts
│   ├── product.model.ts
│   ├── review.model.ts
│   ├── subCategory.model.ts
│   └── user.model.ts
├── routes
│   ├── auth.route.ts
│   ├── brand.route.ts
│   ├── cart.route.ts
│   ├── category.route.ts
│   ├── coupon.route.ts
│   ├── order.route.ts
│   ├── product.route.ts
│   ├── subCategory.route.ts
│   └── user.route.ts
├── swagger.ts
├── types
│   ├── express
│   │   └── index.d.ts
│   ├── jwtToken.type.ts
│   ├── paymentMethodTypes.ts
│   └── sequelize.d.ts
└── utils
    ├── apiError.ts
    ├── apiFeatures.ts
    ├── attachRoutes.ts
    ├── authForTests.ts
    ├── axiosInstance.ts
    ├── emailSender.ts
    ├── generateOTP.ts
    ├── insertDefaultUser.ts
    └── validators
        ├── auth.validator.ts
        ├── brand.validator.ts
        ├── cart.validator.ts
        ├── category.validator.ts
        ├── coupon.validator.ts
        ├── order.validator.ts
        ├── product.validator.ts
        ├── review.validator.ts
        ├── subCategory.validator.ts
        └── user.validator.ts
 ```
 
 ## Requirements
- Node.js
- MySQL

## Installation

git clone https://github.com/abuomerSD/e-shop-server.git
cd ./e-shop-server/server
npm install typescript
npm install
tsc

## Environment Variables
Create `.env` file and add:
```
PORT = 5000
NODE_ENV = development
DB_NAME = (your database name)
DB_USER = (you database username)
DB_PASSWORD = (you database password)
DB_HOST = localhost
DB_DIALECT = mysql
API_TEST_URL = http://localhost:5000/api/v1
JWT_SECRET = your_jwt_secret
DEFAULT_USER_NAME = admin
DEFAULT_USER_EMAIL = admin@admin.com
DEFAULT_USER_PASSWORD = password1
MOYASAR_URL = https://api.moyasar.com/v1/invoices
MOYASAR_SUCCESS_URL = (the page which you want the user to redirected to after payment successfull)
MOYASAR_CALLBACK_URL = https://(your.domain.com)/api/v1/orders/makePayment
MOYASAR_SECRET_KEY = sk_test_***********
DEPLOYMENT_SERVER = (your.domain.com)
NODEMAILER_EMAIL = (your email)
NODEMAILER_PASSWORD = (Email App Password)
```

## Run
`npm run dev`

## API Endpoints

| Method | Endpoint | Description |
|------|---------|-------------|
|   |  Users |   |
| POST | /api/v1/users | Create New user |
| GET | /api/v1/users/:id | find user by id |
| GET | /api/v1/users | find all users |
| PUT | /api/v1/users/:id | update user |
| DELETE | /api/v1/users/:id | delete user |
| POST | /api/v1/users/requestPasswordResetCode | Request OTP Code |
| POST | /api/v1/users/verifyPasswordResetCode | Verify OTP Code |
| POST | /api/v1/users/changePassword | Chnage User Password |
|| Categories ||
|  POST |  /api/v1/categories | create new category  |
|  GET |  /api/v1/categories/:id | find category by id  |
|  GET |  /api/v1/categories | find all categories  |
| PUT  |  /api/v1/categories/:id | update category   |
| DELETE  |  /api/v1/categories/:id | delete category   |
|| SubCategories ||
|  POST |  /api/v1/subCategories | create new subCategory  |
|  GET |  /api/v1/subCategories/:id | find subCategory by id  |
|  GET |  /api/v1/subCategories | find all subCategorys  |
| PUT  |  /api/v1/subCategories/:id | update subCategory   |
| DELETE  |  /api/v1/subCategories/:id | delete subCategory   |
|| Brands ||
|  POST |  /api/v1/brands | create new brand  |
|  GET |  /api/v1/brands/:id | find brand by id  |
|  GET |  /api/v1/brands | find all brands  |
| PUT  |  /api/v1/brands/:id | update brand   |
| DELETE  |  /api/v1/brands/:id | delete brand   |
|| Products ||
|  POST |  /api/v1/products | create new product  |
|  GET |  /api/v1/products/:id | find product by id  |
|  GET |  /api/v1/products | find all products  |
| PUT  |  /api/v1/products/:id | update product   |
| DELETE  |  /api/v1/products/:id | delete product   |
|| Coupons ||
|  POST |  /api/v1/coupons | create new coupon  |
|  GET |  /api/v1/coupons/:id | find coupon by id  |
|  GET |  /api/v1/coupons | find all coupons  |
| PUT  |  /api/v1/coupons/:id | update coupon   |
| DELETE  |  /api/v1/coupons/:id | delete coupon   |
|| Cart ||
|  POST |  /api/v1/cart | add Product To Cart  |
|  POST |  /api/v1/cart/apply-coupon | apply coupon to cart  |
|  GET |  /api/v1/cart | get logged user cart  |
|  PUT |  /api/v1/cart/:productId | update product quantity  |
|  DELETE |  /api/v1/cart/ | clear logged user cart  |
|  DELETE |  /api/v1/cart/:productId | remove product from cart  |
|| Order ||
|  POST |  /api/v1/orders/createCashOrder | create Cash Order  |
|  POST |  /api/v1/orders/createOnlineOrder | create Online Order  |
|| Auth ||
|  POST |  /api/v1/auth/signup | Sign up a new user  |
|  POST |  /api/v1/auth/login | login a user  |


Authorization: Bearer <token>

## Future Improvements
- Complete All E2E tests
- Implement caching 
- Add rate limiting

