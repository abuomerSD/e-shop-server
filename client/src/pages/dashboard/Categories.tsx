import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { categoryService } from "../../services/api";
import type { ICategory } from "../../types/types";
import ReactPaginate from "react-paginate";
import { PAGE_LIMIT } from "../../utils/constants";
import CategoryFormModal from "../../components/forms/CategoryFormModal";
import DeleteModal from "../../components/forms/DeleteModal";
import { API_FILE_URL } from "../../config/env";

const Categories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [deleteLoading, setDeleteLoading] = useState(false);

  const limit = PAGE_LIMIT;

  const fetchCategories = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await categoryService.getAll({
        page: page + 1,
        limit,
        search: searchTerm || undefined,
        searchCol: "name",
      });

      setCategories(response.data);
      // Fix: Ensure we're using the correct property from API response
      const totalResults = response.results || 0;
      setTotalPages(Math.ceil(totalResults / limit));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch categories");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [page, searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    fetchCategories();
  };

  const handleCreate = async (data: any, imageFile: File | null) => {
    await categoryService.create(data, imageFile || undefined);
    await fetchCategories();
  };

  const handleEdit = async (data: any, imageFile: File | null) => {
    if (selectedCategory) {
      await categoryService.update(
        selectedCategory.id,
        data,
        imageFile || undefined
      );
      await fetchCategories();
    }
  };

  const handleDelete = async () => {
    if (selectedCategory) {
      setDeleteLoading(true);
      try {
        await categoryService.delete(selectedCategory.id);
        setShowDeleteModal(false);
        setSelectedCategory(null);
        await fetchCategories();
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to delete category");
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  const openEditModal = (category: ICategory) => {
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  const openDeleteModal = (category: ICategory) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col gap-5">
      <h1 className="font-bold text-2xl">Categories</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white p-5 rounded-lg flex justify-between gap-2">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            className="p-2 rounded-md border-2 border-gray-300 focus:outline-0 focus:border-yellow-500"
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Search
          </button>
        </form>
        <button
          className="bg-yellow-600 p-2 rounded-md text-gray-100 flex items-center gap-2 cursor-pointer hover:bg-yellow-500 transition-colors duration-200"
          onClick={() => setShowCreateModal(true)}
        >
          <PlusIcon className="w-5" />
          New Category
        </button>
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
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Slug</th>
                    <th className="px-4 py-3 text-left">Created At</th>
                    <th className="px-4 py-3 text-left">Image</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {categories.length > 0 ? (
                    categories.map((category, index) => (
                      <tr
                        className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                        key={category.id}
                      >
                        <td className="px-4 py-3">
                          {page * limit + index + 1}
                        </td>
                        <td className="px-4 py-3 font-medium">
                          {category.name}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {category.slug}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {new Date(category.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          {category.image ? (
                            <img
                              src={`${API_FILE_URL}/${category.image}`}
                              alt={category.name}
                              className="w-10 h-10 object-cover rounded"
                            />
                          ) : (
                            <span className="text-gray-400">No image</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2 justify-center">
                            <button
                              className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors"
                              onClick={() => openEditModal(category)}
                              title="Edit category"
                            >
                              <PencilIcon className="w-4 h-4" />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-colors"
                              onClick={() => openDeleteModal(category)}
                              title="Delete category"
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
                        colSpan={6}
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        {searchTerm
                          ? "No categories found matching your search."
                          : "No categories found."}
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
                  forcePage={page}
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
      <CategoryFormModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreate}
        title="Create New Category"
      />

      <CategoryFormModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedCategory(null);
        }}
        onSubmit={handleEdit}
        category={selectedCategory || undefined}
        title="Edit Category"
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedCategory(null);
        }}
        onConfirm={handleDelete}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone."
        loading={deleteLoading}
      />
    </div>
  );
};

export default Categories;
