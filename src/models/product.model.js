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