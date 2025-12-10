import User from "./user.model";
import Product from "./product.model";
import CartItem from "./cartItems.model";
import Cart from "./cart.model";
import Order from "./order.model";
import ProductImages from "./productImages.model";
import Review from "./review.model";
import Category from "./category.model";
import SubCategory from "./subCategory.model";

// cart
Cart.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

Cart.belongsToMany(Product, {
  through: "CartItems",
  foreignKey: "cartId",
  otherKey: "productId",
  as: "products",
});

Cart.hasMany(CartItem, {
  foreignKey: "cartId",
  as: "cartItems",
});

// cart items
CartItem.belongsTo(Cart, {
  foreignKey: "cartId",
  as: "cart",
});

CartItem.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

// order
Order.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

Order.belongsToMany(Product, {
  through: "OrderItems",
  foreignKey: "orderId",
  otherKey: "productId",
  as: "products",
});

// product images
ProductImages.belongsTo(Product);

Product.hasMany(ProductImages);

// review
Review.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

Review.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

Product.hasMany(Review, {
  foreignKey: "productId",
  as: "reviews",
});

// subcategory
Category.hasMany(SubCategory, {
  foreignKey: "categoryId",
  as: "subCategories",
});

SubCategory.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});
