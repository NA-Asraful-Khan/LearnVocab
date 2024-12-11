import { useState } from "react";
import { toast } from "react-toastify";
import { FiShieldOff } from "react-icons/fi";
import { TbShieldFilled } from "react-icons/tb";
import {
  useChangeUserRoleMutation,
  useGetAllUsersByPaginationQuery,
} from "../../../redux/features/user/userManagement.api";
import { BiEdit, BiLoader } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { FaDeleteLeft } from "react-icons/fa6";

export default function UserList() {
  // To Find Current User
  // const CurrentUser = useSelector(selectCurrentUser);
  //   console.log(CurrentUser);

  const navigate = useNavigate();

  const params = [];
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // Get All User Data
  const { data, isLoading, isFetching } = useGetAllUsersByPaginationQuery([
    { name: "limit", value: pageSize },
    { name: "page", value: page },
    { name: "sort", value: "-id" },
    ...params,
  ]);

  const [handleRole] = useChangeUserRoleMutation();
  //userData
  const userData = data?.data;
  //pagination Data
  const pagination = data?.pagination;

  const handleRoleChange = async (userId, newRole) => {
    const finalRole = {
      id: userId,
      data: {
        role: newRole,
      },
    };

    await handleRole(finalRole);
    toast.success(`User role updated to ${newRole}`);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const startIndex = (page - 1) * pagination?.limit;

  const handleImageError = (e) => {
    e.target.src = "/fallBack_Image.jpg";
  };
  return (
    <div className="max-w-6xl mt-3 mx-auto">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
          <p className="mt-2 text-gray-600">
            Update user roles and permissions
          </p>
        </div>
        <button
          onClick={() => navigate("create")}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          Create User
        </button>
      </div>
      {isLoading && isFetching ? (
        <div className="w-full text-7xl flex justify-center items-center">
          <BiLoader />
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userData?.map((user, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user.photo}
                          alt={user.name}
                          onError={handleImageError}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === "admin"
                          ? "bg-indigo-100 text-indigo-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleRoleChange(user?._id, "user")}
                        className="text-red-600 hover:text-red-900 flex items-center "
                      >
                        <FiShieldOff className="h-4 w-4 mr-1" />
                        Remove Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRoleChange(user?._id, "admin")}
                        className="text-indigo-600 hover:text-indigo-900 flex items-center"
                      >
                        <TbShieldFilled className="h-4 w-4 mr-1" />
                        Make Admin
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 flex gap-1 whitespace-nowrap text-sm text-gray-500">
                    <Link to={`/admin/user_management/${user?._id}`}>
                      <button className="text-indigo-600 hover:text-indigo-900 flex items-center rounded p-2 border border-indigo-900">
                        <BiEdit className="h-4 w-4 mr-1" />
                      </button>
                    </Link>

                    <button className="text-indigo-600 hover:text-indigo-900 flex items-center rounded p-2 border border-indigo-900">
                      <FaDeleteLeft className="h-4 w-4 mr-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Previous
              </button>
              {Array.from(
                { length: pagination?.totalPage },
                (_, i) => i + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    page === page
                      ? "bg-indigo-50 border-indigo-500 text-indigo-600"
                      : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === pagination?.totalPage}
                className="ml-3 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span>{" "}
                  to
                  <span className="font-medium">
                    {Math.min(startIndex + pagination?.limit, userData?.length)}
                  </span>{" "}
                  of <span className="font-medium">{userData?.length}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  {Array.from(
                    { length: pagination?.totalPage },
                    (_, i) => i + 1
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        page === page
                          ? "bg-indigo-50 border-indigo-500 text-indigo-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === pagination?.totalPage}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
