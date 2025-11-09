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