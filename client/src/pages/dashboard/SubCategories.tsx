import { useState, useEffect } from "react";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import ReactPaginate from "react-paginate";
import type { ISubCategory, ISubCategoryCreate } from "../../types/types";
import { PAGE_LIMIT } from "../../utils/constants";
import SubCategoryFormModal from "../../components/forms/SubCategoryFormModal";
import { subCategoryService } from "../../services/api";

const SubCategories = () => {
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<ISubCategory | null>(null);

  const fetchSubCategories = async (currentPage = 0, search = "") => {
    try {
      setLoading(true);
      const params = {
        page: currentPage + 1,
        limit: PAGE_LIMIT,
        ...(search && { search, searchCol: "name" }),
      };

      const response = await subCategoryService.getAll(params);
      setSubCategories(response.data);
      setTotalPages(Math.ceil(response.total / PAGE_LIMIT));
      setTotalCount(response.total);
    } catch (error) {
      console.error("Failed to fetch subcategories:", error);
      setError("Failed to load subcategories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategories(page, searchTerm);
  }, [page]);

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      setPage(0);
      fetchSubCategories(0, searchTerm);
    }, 300);

    return () => clearTimeout(debounceSearch);
  }, [searchTerm]);

  const handleCreate = async (data: ISubCategoryCreate, imageFile?: File) => {
    await subCategoryService.create(data, imageFile);
    await fetchSubCategories(page, searchTerm);
    setShowCreateModal(false);
  };

  const handleUpdate = async (data: ISubCategoryCreate, imageFile?: File) => {
    if (selectedSubCategory) {
      await subCategoryService.update(selectedSubCategory.id, data, imageFile);
      await fetchSubCategories(page, searchTerm);
      setSelectedSubCategory(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      try {
        await subCategoryService.delete(id);
        await fetchSubCategories(page, searchTerm);
      } catch (error) {
        console.error("Failed to delete subcategory:", error);
        setError("Failed to delete subcategory");
      }
    }
  };

  const handlePageClick = (event: { selected: number }) => {
    setPage(event.selected);
  };

  const handleEdit = (subCategory: ISubCategory) => {
    setSelectedSubCategory(subCategory);
  };

  const closeModal = () => {
    setSelectedSubCategory(null);
    setShowCreateModal(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">SubCategories</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors duration-200"
        >
          <PlusIcon className="w-5 h-5" />
          Add SubCategory
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search subcategories..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* SubCategories Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  Loading subcategories...
                </td>
              </tr>
            ) : subCategories.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  {searchTerm
                    ? "No subcategories found matching your search."
                    : "No subcategories found."}
                </td>
              </tr>
            ) : (
              subCategories.map((subCategory) => (
                <tr key={subCategory.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {subCategory.image ? (
                      <img
                        className="h-10 w-10 rounded-md object-cover"
                        src={subCategory.image}
                        alt={subCategory.name}
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No img</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {subCategory.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {typeof subCategory.category === "object"
                      ? subCategory.category.name
                      : subCategory.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subCategory.slug}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(subCategory.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(subCategory)}
                        className="text-yellow-600 hover:text-yellow-900 p-1"
                        title="Edit"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(subCategory.id)}
                        className="text-red-600 hover:text-red-900 p-1"
                        title="Delete"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="Previous"
            forcePage={page}
            className="flex items-center space-x-2"
            pageClassName="px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            previousClassName="px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
            nextClassName="px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
            activeClassName="px-3 py-2 text-sm leading-tight text-yellow-600 bg-yellow-50 border border-yellow-300 hover:bg-yellow-100 hover:text-yellow-700"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </div>
      )}

      {/* Results summary */}
      <div className="mt-4 text-sm text-gray-600 text-center">
        Showing {subCategories.length > 0 ? page * PAGE_LIMIT + 1 : 0} to{" "}
        {Math.min((page + 1) * PAGE_LIMIT, totalCount)} of {totalCount} results
      </div>

      {/* Modals */}
      <SubCategoryFormModal
        isOpen={showCreateModal}
        onClose={closeModal}
        onSubmit={handleCreate}
        title="Create SubCategory"
      />

      <SubCategoryFormModal
        isOpen={!!selectedSubCategory}
        onClose={closeModal}
        onSubmit={handleUpdate}
        subCategory={selectedSubCategory || undefined}
        title="Edit SubCategory"
      />
    </div>
  );
};

export default SubCategories;
