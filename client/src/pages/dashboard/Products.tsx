import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import {
  productService,
  categoryService,
  brandService,
} from "../../services/api";
import type {
  IProduct,
  ICategory,
  IBrand,
  IProductCreate,
} from "../../types/types";
import ReactPaginate from "react-paginate";
import { PAGE_LIMIT } from "../../utils/constants";
import ProductFormModal from "../../components/forms/ProductFormModal";
import DeleteModal from "../../components/forms/DeleteModal";
import { API_FILE_URL } from "../../config/env";

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [error, setError] = useState("");

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const limit = PAGE_LIMIT;

  const fetchProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await productService.getAll({
        page: page + 1,
        limit,
        search: searchTerm || undefined,
        categoryId: selectedCategory || undefined,
        brandId: selectedBrand || undefined,
      });

      setProducts(response.data);
      setTotalPages(Math.ceil((response.results || 0) / limit));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilters = async () => {
    try {
      const [categoriesRes, brandsRes] = await Promise.all([
        categoryService.getAll({ limit: 100 }),
        brandService.getAll({ limit: 100 }),
      ]);
      setCategories(categoriesRes.data);
      setBrands(brandsRes.data);
    } catch (err) {
      console.error("Failed to fetch filter data:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, searchTerm, selectedCategory, selectedBrand]);

  useEffect(() => {
    fetchFilters();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    fetchProducts();
  };

  const handleCreate = async (
    data: IProductCreate,
    imageCover?: File,
    images?: File[]
  ) => {
    try {
      await productService.create(data, imageCover, images);
      setShowCreateModal(false);
      await fetchProducts();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create product");
      throw err; // Re-throw so modal can handle it
    }
  };

  const handleEdit = async (
    data: IProductCreate,
    imageCover?: File,
    images?: File[]
  ) => {
    if (selectedProduct) {
      try {
        await productService.update(
          selectedProduct.id,
          data,
          imageCover,
          images
        );
        setShowEditModal(false);
        setSelectedProduct(null);
        await fetchProducts();
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to update product");
        throw err; // Re-throw so modal can handle it
      }
    }
  };

  const handleDelete = async () => {
    if (selectedProduct) {
      setDeleteLoading(true);
      try {
        await productService.delete(selectedProduct.id);
        setShowDeleteModal(false);
        setSelectedProduct(null);
        await fetchProducts();
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to delete product");
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  const openEditModal = (product: IProduct) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const openDeleteModal = (product: IProduct) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const formatPrice = (price?: number) => {
    if (!price) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col gap-5">
      <h1 className="font-bold text-2xl">Products</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white p-5 rounded-lg">
        <form onSubmit={handleSearch} className="flex flex-wrap gap-2 mb-4">
          <input
            className="p-2 rounded-md border-2 border-gray-300 focus:outline-0 focus:border-yellow-500 flex-1 min-w-64"
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-2 rounded-md border-2 border-gray-300 focus:outline-0 focus:border-yellow-500"
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
          <select
            className="p-2 rounded-md border-2 border-gray-300 focus:outline-0 focus:border-yellow-500"
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
          <button
            type="submit"
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Search
          </button>
        </form>

        <div className="flex justify-end">
          <button
            className="bg-yellow-600 p-2 rounded-md text-gray-100 flex items-center gap-2 cursor-pointer hover:bg-yellow-500 transition-colors duration-200"
            onClick={() => setShowCreateModal(true)}
          >
            <PlusIcon className="w-5" />
            New Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">Image</th>
                    <th className="px-4 py-3 text-left">Title</th>
                    <th className="px-4 py-3 text-left">Price</th>
                    <th className="px-4 py-3 text-left">Quantity</th>
                    <th className="px-4 py-3 text-left">Category</th>
                    <th className="px-4 py-3 text-left">Brand</th>
                    <th className="px-4 py-3 text-left">Rating</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.length > 0 ? (
                    products.map((product, index) => (
                      <tr
                        className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                        key={product.id}
                      >
                        <td className="px-4 py-3">
                          {page * limit + index + 1}
                        </td>
                        <td className="px-4 py-3">
                          {product.imageCover ? (
                            <img
                              src={`${API_FILE_URL}/${product.imageCover}`}
                              alt={product.title}
                              className="w-12 h-12 object-cover rounded"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                              <span className="text-gray-400 text-xs">
                                No image
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium">{product.title}</div>
                          <div className="text-gray-500 text-xs truncate max-w-xs">
                            {product.description}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium">
                            {formatPrice(product.price)}
                          </div>
                          {product.priceAfterDiscount && (
                            <div className="text-green-600 text-xs">
                              Sale: {formatPrice(product.priceAfterDiscount)}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              (product.quantity || 0) > 0
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.quantity || 0}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {product.category?.name || "N/A"}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {product.brand?.name || "N/A"}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span>
                              {product.ratingsAverage?.toFixed(1) || "0.0"}
                            </span>
                            <span className="text-gray-400 text-xs">
                              ({product.ratingsQuantity || 0})
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2 justify-center">
                            <button
                              className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors"
                              onClick={() => openEditModal(product)}
                              title="Edit product"
                            >
                              <PencilIcon className="w-4 h-4" />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-colors"
                              onClick={() => openDeleteModal(product)}
                              title="Delete product"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={9}
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        {searchTerm
                          ? "No products found matching your search."
                          : "No products found."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="p-4 border-t">
                <ReactPaginate
                  previousLabel={"← Previous"}
                  nextLabel={"Next →"}
                  pageCount={totalPages}
                  onPageChange={(selected) => setPage(selected.selected)}
                  containerClassName="flex justify-center items-center gap-2"
                  pageClassName="px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer transition-colors"
                  previousClassName="px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer transition-colors"
                  nextClassName="px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer transition-colors"
                  activeClassName="bg-yellow-600 text-white border-yellow-600 hover:bg-yellow-600"
                  disabledClassName="opacity-50 cursor-not-allowed"
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      <ProductFormModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreate}
        title="Create New Product"
      />

      <ProductFormModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedProduct(null);
        }}
        onSubmit={handleEdit}
        product={selectedProduct || undefined}
        title="Edit Product"
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedProduct(null);
        }}
        onConfirm={handleDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        loading={deleteLoading}
      />
    </div>
  );
};

export default Products;
