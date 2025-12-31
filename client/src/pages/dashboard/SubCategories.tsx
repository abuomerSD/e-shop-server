import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { subCategoryService, categoryService } from "../../services/api";
import type { ISubCategory, ICategory } from "../../types/types";
import ReactPaginate from "react-paginate";
import { PAGE_LIMIT } from "../../utils/constants";

const SubCategories = () => {
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState("");
  const limit = PAGE_LIMIT;

  const fetchSubCategories = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await subCategoryService.getAll({
        page: page + 1,
        limit,
        search: searchTerm || undefined,
        categoryId: selectedCategory || undefined,
      });

      setSubCategories(response.data);
      setTotalPages(Math.ceil((response.results || 0) / limit));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch subcategories");
      setSubCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAll({ limit: 100 });
      setCategories(response.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, [page, searchTerm, selectedCategory]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    fetchSubCategories();
  };

  return (
    <div className="min-h-screen flex flex-col gap-5">
      <h1 className="font-bold text-2xl">SubCategories</h1>

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
            placeholder="Search subcategories..."
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
          <button
            type="submit"
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Search
          </button>
        </form>
        <button className="bg-yellow-600 p-2 rounded-md text-gray-100 flex items-center gap-2 cursor-pointer hover:bg-yellow-500 transition-colors duration-200">
          <PlusIcon className="w-5" />
          New SubCategory
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
                    <th className="px-4 py-3 text-left">Category</th>
                    <th className="px-4 py-3 text-left">Created At</th>
                    <th className="px-4 py-3 text-left">Image</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {subCategories.length > 0 ? (
                    subCategories.map((subCategory, index) => (
                      <tr
                        className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                        key={subCategory.id}
                      >
                        <td className="px-4 py-3">
                          {page * limit + index + 1}
                        </td>
                        <td className="px-4 py-3 font-medium">
                          {subCategory.name}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {subCategory.slug}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {subCategory.category?.name || "N/A"}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {new Date(subCategory.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          {subCategory.image ? (
                            <img
                              src={subCategory.image}
                              alt={subCategory.name}
                              className="w-10 h-10 object-cover rounded"
                            />
                          ) : (
                            <span className="text-gray-400">No image</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2 justify-center">
                            <button className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors">
                              <PencilIcon className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-colors">
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        {searchTerm
                          ? "No subcategories found matching your search."
                          : "No subcategories found."}
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
    </div>
  );
};

export default SubCategories;
