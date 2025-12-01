// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
name: {
type: DataTypes.STRING,
allowNull: false,
},
slug: {
type: DataTypes.STRING,
},
email: {
type: DataTypes.STRING,
unique: true,
allowNull: false,
},
phone: {
type: DataTypes.STRING,
},
profileImg: {
type: DataTypes.STRING,
},
password: {
type: DataTypes.STRING,
allowNull: false,
},
passwordChangedAt: {
type: DataTypes.DATE,
},
passwordResetCode: {
type: DataTypes.STRING,
},
passwordResetExpires: {
type: DataTypes.DATE,
},
passwordResetVerified: {
type: DataTypes.BOOLEAN,
},
role: {
type: DataTypes.ENUM('user', 'manager', 'admin'),
defaultValue: 'user',
},
active: {
type: DataTypes.BOOLEAN,
defaultValue: true,
},
}, {
timestamps: true,
hooks: {
beforeSave: async (user) => {
if (user.changed('password')) {
user.password = await bcrypt.hash(user.password, 12);
}
},
},
});

module.exports = User;

// models/Category.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Category = sequelize.define('Category', {
name: {
type: DataTypes.STRING,
allowNull: false,
unique: true,
},
slug: {
type: DataTypes.STRING,
},
image: {
type: DataTypes.STRING,
},
}, { timestamps: true });

module.exports = Category;

// models/SubCategory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Category = require('./Category');

const SubCategory = sequelize.define('SubCategory', {
name: {
type: DataTypes.STRING,
allowNull: false,
unique: true,
},
slug: {
type: DataTypes.STRING,
},
}, { timestamps: true });

Category.hasMany(SubCategory, { foreignKey: 'categoryId' });
SubCategory.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = SubCategory;

// models/Brand.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Brand = sequelize.define('Brand', {
name: {
type: DataTypes.STRING,
allowNull: false,
unique: true,
},
slug: {
type: DataTypes.STRING,
},
image: DataTypes.STRING,
}, { timestamps: true });

module.exports = Brand;

// models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Category = require('./Category');
const SubCategory = require('./SubCategory');
const Brand = require('./Brand');

const Product = sequelize.define('Product', {
title: {
type: DataTypes.STRING,
allowNull: false,
},
slug: DataTypes.STRING,
description: {
type: DataTypes.TEXT,
allowNull: false,
},
quantity: DataTypes.INTEGER,
sold: {
type: DataTypes.INTEGER,
defaultValue: 0,
},
price: DataTypes.FLOAT,
priceAfterDiscount: DataTypes.FLOAT,
colors: DataTypes.JSON,
imageCover: DataTypes.STRING,
images: DataTypes.JSON,
ratingsAverage: {
type: DataTypes.FLOAT,
defaultValue: 0,
},
ratingsQuantity: {
type: DataTypes.INTEGER,
defaultValue: 0,
},
}, { timestamps: true });

Product.belongsTo(Category, { foreignKey: 'categoryId' });
Product.belongsTo(Brand, { foreignKey: 'brandId' });

Product.belongsToMany(SubCategory, {
through: 'ProductSubcategories',
foreignKey: 'productId',
});

module.exports = Product;

// models/Review.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Product = require('./Product');
const User = require('./User');

const Review = sequelize.define('Review', {
title: DataTypes.STRING,
ratings: {
type: DataTypes.FLOAT,
allowNull: false,
},
}, { timestamps: true });

Review.belongsTo(User, { foreignKey: 'userId' });
Review.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Review, { foreignKey: 'productId' });

module.exports = Review;

// models/Cart.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');
const Product = require('./Product');

const Cart = sequelize.define('Cart', {
totalCartPrice: DataTypes.FLOAT,
totalPriceAfterDiscount: DataTypes.FLOAT,
}, { timestamps: true });

Cart.belongsTo(User, { foreignKey: 'userId' });
Cart.belongsToMany(Product, {
through: 'CartItems',
foreignKey: 'cartId',
});

module.exports = Cart;

// models/Coupon.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Coupon = sequelize.define('Coupon', {
name: {
type: DataTypes.STRING,
allowNull: false,
unique: true,
},
expire: DataTypes.DATE,
discount: DataTypes.FLOAT,
}, { timestamps: true });

module.exports = Coupon;

// models/Order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');
const Product = require('./Product');

const Order = sequelize.define('Order', {
taxPrice: { type: DataTypes.FLOAT, defaultValue: 0 },
shippingAddress: { type: DataTypes.JSON },
shippingPrice: { type: DataTypes.FLOAT, defaultValue: 0 },
totalOrderPrice: DataTypes.FLOAT,
paymentMethodType: {
type: DataTypes.ENUM('card', 'cash'),
defaultValue: 'cash',
},
isPaid: { type: DataTypes.BOOLEAN, defaultValue: false },
paidAt: DataTypes.DATE,
isDelivered: { type: DataTypes.BOOLEAN, defaultValue: false },
deliveredAt: DataTypes.DATE,
}, { timestamps: true });

Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsToMany(Product, {
through: 'OrderItems',
foreignKey: 'orderId',
});

module.exports = Order;

👤 Customer Stories

As a customer, I can register and log in so that I can access my account.

As a customer, I can browse products by category, brand, and subcategory.

As a customer, I can search and filter products by name, price, or rating.

As a customer, I can add products to my shopping cart.

As a customer, I can view and update quantities in my cart.

As a customer, I can apply a coupon to my cart for a discount.

As a customer, I can checkout and place an order.

As a customer, I can choose payment method (cash or card).

As a customer, I can view my order history.

As a customer, I can write product reviews and rate products.

As a customer, I can update my profile, address, and wishlist.

Admin/Manager Stories

As an admin, I can create, update, and delete categories, subcategories, and brands.

As an admin, I can add, edit, and remove products.

As an admin, I can view all users and manage their roles.

As an admin, I can view and manage all orders (mark paid/delivered).

As an admin, I can create and manage coupons.

As an admin, I can view sales reports.

Sprint Breakdown (Example: 4 Sprints)
Sprint Duration Goals
Sprint 1: Setup & Auth 1 week Setup Sequelize + Express backend, implement User model, authentication (JWT), and roles.
Sprint 2: Product Management 1 week Build CRUD for Category, SubCategory, Brand, and Product (with images). Add product listing/search/filter APIs.
Sprint 3: Cart & Orders 1 week Implement Cart, Coupon, and Order models with logic for cart total, checkout, and payment method.
Sprint 4: Reviews & Dashboard 1 week Add Review system, user profile management, and basic admin dashboard APIs (sales reports, top products).

<!-- my app features -->

- role passed auth
- resize uploaded images
- controllers factory
-
