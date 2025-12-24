import { PlusIcon } from "@heroicons/react/16/solid";

const Categories = () => {
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
            <tr className="odd:bg-white even:bg-gray-50 hover:bg-gray-100">
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">Category 1</td>
              <td className="px-4 py-2">1-12-2025</td>
              <td className="px-4 py-2">
                <img
                  className="w-16 h-16 rounded object-cover"
                  src="https://cdn.thewirecutter.com/wp-content/media/2024/07/laptopstopicpage-2048px-3685-3x2-1.jpg?auto=webp&quality=75&crop=4:3,smart&width=1024"
                />
              </td>
              <td className="px-4 py-2 flex gap-2 justify-center">
                <button className="text-blue-600">Edit</button>
                <button className="text-red-600">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
