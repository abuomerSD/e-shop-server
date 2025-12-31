import { PlusIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { http } from "../../services/http";
import { API_URL } from "../../config/env";
import type { ICategory } from "../../types/types";
import ReactPaginate from "react-paginate";
import { PAGE_LIMIT } from "../../utils/constants";

const Categories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [page, setPage] = useState(0); // react-paginate index starts at 0
  const [totalPages, setTotalPages] = useState(0);
  const limit = PAGE_LIMIT;

  useEffect(() => {
    let isMounted = true; // للتأكد أن الكومبوننت لم يُفكك أثناء الـ request

    const fetchCategories = async () => {
      try {
        const res = await http.get(
          `${API_URL}/categories?page=${page + 1}&limit=${limit}`
        );

        if (isMounted) {
          setCategories(res.data); // data من API
          setTotalPages(res.results);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();

    return () => {
      isMounted = false; // عند unmount الكومبوننت
    };
  }, [page]);

  return (
    <div className="min-h-screen flex flex-col gap-5">
      <h1 className="font-bold text-2xl">Categories</h1>
      <div className="h-1/4 bg-white p-5 rounded-lg flex justify-between gap-2">
        <input
          className="p-2 rounded-md border-2 border-gray-300 focus:outline-0"
          type="text"
          placeholder="search"
        />
        <button className="bg-yellow-600 p-2 rounded-md text-gray-100 flex items-center cursor-pointer hover:bg-yellow-500 transition-colors duration-200">
          <PlusIcon className="w-5" />
          New
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Created At</th>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {categories.length > 0 &&
              categories.map((category, index) => (
                <tr
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                  key={category.id}
                >
                  <td className="px-4 py-2">{page * limit + index + 1}</td>
                  <td className="px-4 py-2">{category.name}</td>
                  <td className="px-4 py-2">
                    {new Date(category.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{category.image}</td>
                  <td className="px-4 py-2 flex gap-2 justify-center">
                    <button className="text-blue-600 cursor-pointer">
                      Edit
                    </button>
                    <button className="text-red-600 cursor-pointer">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          pageCount={totalPages}
          onPageChange={(selected) => setPage(selected.selected)}
          containerClassName="flex justify-center mt-4 gap-2"
          pageClassName="px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer"
          previousClassName="px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer"
          nextClassName="px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer"
          activeClassName="bg-blue-600 text-white"
        />
      </div>
    </div>
  );
};

export default Categories;
