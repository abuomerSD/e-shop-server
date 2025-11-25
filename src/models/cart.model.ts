// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/sequelize');
// const User = require('./User');
// const Product = require('./Product');

// const Cart = sequelize.define('Cart', {
//   totalCartPrice: DataTypes.FLOAT,
//   totalPriceAfterDiscount: DataTypes.FLOAT,
// }, { timestamps: true });

// Cart.belongsTo(User, { foreignKey: 'userId' });
// Cart.belongsToMany(Product, {
//   through: 'CartItems',
//   foreignKey: 'cartId',
// });

// module.exports = Cart;
