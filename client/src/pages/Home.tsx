import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { productService, categoryService, brandService } from "../services/api";
import type { IProduct, ICategory, IBrand } from "../types/types";
import { ShoppingCartIcon, StarIcon } from "@heroicons/react/16/solid";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAll({
        limit: 12,
        search: searchTerm || undefined,
        categoryId: selectedCategory || undefined,
        brandId: selectedBrand || undefined,
        sort: sortBy || undefined,
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilters = async () => {
    try {
      const [categoriesRes, brandsRes] = await Promise.all([
        categoryService.getAll({ limit: 20 }),
        brandService.getAll({ limit: 20 }),
      ]);
      setCategories(categoriesRes.data);
      setBrands(brandsRes.data);
    } catch (error) {
      console.error("Failed to fetch filters:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategory, selectedBrand, sortBy]);

  useEffect(() => {
    fetchFilters();
  }, []);

  const formatPrice = (price?: number) => {
    if (!price) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const renderStars = (rating?: number) => {
    const stars = [];
    const filledStars = Math.floor(rating || 0);

    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarIcon
          key={i}
          className={`w-4 h-4 ${
            i < filledStars ? "text-yellow-400" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  const handleAddToCart = async (productId: string) => {
    if (!isAuthenticated) {
      setErrorMessage("Please login to add items to cart");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    setAddingToCart(productId);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await addToCart(productId);
      setSuccessMessage("Item added to cart successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to add item to cart");
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setAddingToCart(null);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to E-Shop
            </h1>
            <p className="text-xl md:text-2xl text-yellow-100">
              Discover amazing products at great prices
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Success/Error Messages */}
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {errorMessage}
            </div>
          )}

          {/* Filters */}
          <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Products
                </label>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  <option value="">All Brands</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="">Default</option>
                  <option value="price">Price: Low to High</option>
                  <option value="-price">Price: High to Low</option>
                  <option value="-createdAt">Newest First</option>
                  <option value="-ratingsAverage">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.length > 0 ? (
                products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200">
                      {product.imageCover ? (
                        <img
                          src={product.imageCover}
                          alt={product.title}
                          className="h-64 w-full object-cover object-center group-hover:opacity-75"
                        />
                      ) : (
                        <div className="h-64 w-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {renderStars(product.ratingsAverage)}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          ({product.ratingsQuantity || 0} reviews)
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-gray-900">
                            {formatPrice(product.price)}
                          </span>
                        </div>
                        <button
                          onClick={() => handleAddToCart(product.id)}
                          disabled={
                            addingToCart === product.id ||
                            (product.quantity || 0) <= 0
                          }
                          className="bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          title={
                            !isAuthenticated
                              ? "Login to add to cart"
                              : (product.quantity || 0) <= 0
                              ? "Out of stock"
                              : "Add to cart"
                          }
                        >
                          {addingToCart === product.id ? (
                            <div className="w-5 h-5 animate-spin border-2 border-white border-t-transparent rounded-full"></div>
                          ) : (
                            <ShoppingCartIcon className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      <div className="mt-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            (product.quantity || 0) > 0
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {(product.quantity || 0) > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <p className="text-gray-500 text-lg">No products found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
