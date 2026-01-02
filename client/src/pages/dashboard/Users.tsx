import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { userService } from "../../services/api";
import type { IUser, IUserCreate } from "../../types/types";
import ReactPaginate from "react-paginate";
import { PAGE_LIMIT } from "../../utils/constants";
import UserFormModal from "../../components/forms/UserFormModal";
import DeleteModal from "../../components/forms/DeleteModal";

const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const limit = PAGE_LIMIT;

  const fetchUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await userService.getAll({
        page: page + 1,
        limit,
        search: searchTerm || undefined,
        searchCol: "name",
        role: selectedRole || undefined,
      });

      setUsers(response.data);
      setTotalPages(Math.ceil((response.results || 0) / limit));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, searchTerm, selectedRole]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    fetchUsers();
  };

  const handleCreate = async (data: IUserCreate) => {
    try {
      await userService.create(data);
      setShowCreateModal(false);
      await fetchUsers();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create user");
      throw err; // Re-throw so modal can handle it
    }
  };

  const handleEdit = async (data: IUserCreate) => {
    if (selectedUser) {
      try {
        await userService.update(selectedUser.id, data);
        setShowEditModal(false);
        setSelectedUser(null);
        await fetchUsers();
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to update user");
        throw err; // Re-throw so modal can handle it
      }
    }
  };

  const handleDelete = async () => {
    if (selectedUser) {
      setDeleteLoading(true);
      try {
        await userService.delete(selectedUser.id);
        setShowDeleteModal(false);
        setSelectedUser(null);
        await fetchUsers();
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to delete user");
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  const openEditModal = (user: IUser) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const openDeleteModal = (user: IUser) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "manager":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-5">
      <h1 className="font-bold text-2xl">Users</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white p-5 rounded-lg flex justify-between gap-2">
        <div className="flex gap-2">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              className="p-2 rounded-md border-2 border-gray-300 focus:outline-0 focus:border-yellow-500"
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="p-2 rounded-md border-2 border-gray-300 focus:outline-0 focus:border-yellow-500"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="user">User</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
            <button
              type="submit"
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
        <button
          className="bg-yellow-600 p-2 rounded-md text-gray-100 flex items-center gap-2 cursor-pointer hover:bg-yellow-500 transition-colors duration-200"
          onClick={() => setShowCreateModal(true)}
        >
          <PlusIcon className="w-5" />
          New User
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
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Phone</th>
                    <th className="px-4 py-3 text-left">Role</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Created At</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr
                        className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                        key={user.id}
                      >
                        <td className="px-4 py-3">
                          {page * limit + index + 1}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {user.profileImg ? (
                              <img
                                src={user.profileImg}
                                alt={user.name}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-gray-600 text-xs font-medium">
                                  {user.name?.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {user.email}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {user.phone || "N/A"}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(
                              user.role
                            )}`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              user.active
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {user.active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2 justify-center">
                            <button
                              className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors"
                              onClick={() => openEditModal(user)}
                              title="Edit user"
                            >
                              <PencilIcon className="w-4 h-4" />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-colors"
                              onClick={() => openDeleteModal(user)}
                              title="Delete user"
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
                        colSpan={8}
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        {searchTerm
                          ? "No users found matching your search."
                          : "No users found."}
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
      <UserFormModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreate}
        title="Create New User"
      />

      <UserFormModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedUser(null);
        }}
        onSubmit={handleEdit}
        user={selectedUser || undefined}
        title="Edit User"
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedUser(null);
        }}
        onConfirm={handleDelete}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        loading={deleteLoading}
      />
    </div>
  );
};

export default Users;
