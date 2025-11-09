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