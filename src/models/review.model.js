// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/sequelize');
// const Product = require('./Product');
// const User = require('./User');

// const Review = sequelize.define('Review', {
//   title: DataTypes.STRING,
//   ratings: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
// }, { timestamps: true });

// Review.belongsTo(User, { foreignKey: 'userId' });
// Review.belongsTo(Product, { foreignKey: 'productId' });
// Product.hasMany(Review, { foreignKey: 'productId' });

// module.exports = Review;
