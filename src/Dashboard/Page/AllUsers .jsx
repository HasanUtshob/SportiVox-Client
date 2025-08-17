import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { Themecontext } from "../../Context/ThemeContext";
import {
  MdPeople,
  MdSearch,
  MdRefresh,
  MdDelete,
  MdEmail,
  MdPerson,
  MdSecurity,
  MdFilterList,
  MdViewList,
  MdViewModule,
  MdEdit,
  MdAdminPanelSettings,
  MdVerifiedUser,
  MdPersonOutline,
} from "react-icons/md";
import {
  FaUsers,
  FaTrash,
  FaUserEdit,
  FaCrown,
  FaTrophy,
  FaUser,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useAxios from "../../hooks/useAxios";
import Loading from "../../Component/Loading";

const AllUsers = () => {
  const { darkmode } = useContext(Themecontext);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("table");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const axiosSecure = useAxios();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/users");
      const sortedUsers = res.data.sort((a, b) => a.name.localeCompare(b.name));
      setUsers(sortedUsers);
      setFilteredUsers(sortedUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
      setFilteredUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [axiosSecure]);

  // Filter and search users
  useEffect(() => {
    let filtered = users;

    // Apply search filter
    if (searchText) {
      filtered = filtered.filter(
        (user) =>
          user.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Apply role filter
    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    // Apply sorting
    switch (sortBy) {
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "email":
        filtered.sort((a, b) => a.email.localeCompare(b.email));
        break;
      case "role":
        filtered.sort((a, b) => a.role.localeCompare(b.role));
        break;
      default:
        break;
    }

    setFilteredUsers(filtered);
  }, [users, searchText, roleFilter, sortBy]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleDeleteUser = async (email, userName) => {
    const result = await Swal.fire({
      title: "Delete User?",
      text: `This will permanently remove ${userName} from the system.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      background: "#ffffff",
      customClass: {
        popup: "rounded-2xl shadow-2xl",
        confirmButton: "rounded-xl px-6 py-3",
        cancelButton: "rounded-xl px-6 py-3",
      },
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        const res = await axiosSecure.delete(`/users/${email}`);
        if (res.data.deletedCount > 0) {
          await Swal.fire({
            title: "Deleted!",
            text: "User has been successfully removed.",
            icon: "success",
            confirmButtonColor: "#10B981",
            customClass: {
              popup: "rounded-2xl shadow-2xl",
              confirmButton: "rounded-xl px-6 py-3",
            },
          });
          fetchUsers();
        } else {
          Swal.fire({
            title: "Not Found",
            text: "No user found to delete.",
            icon: "info",
            confirmButtonColor: "#3B82F6",
            customClass: {
              popup: "rounded-2xl shadow-2xl",
              confirmButton: "rounded-xl px-6 py-3",
            },
          });
        }
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire({
          title: "Error!",
          text: "Could not delete user.",
          icon: "error",
          confirmButtonColor: "#EF4444",
          customClass: {
            popup: "rounded-2xl shadow-2xl",
            confirmButton: "rounded-xl px-6 py-3",
          },
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRoleChange = async (user, newRole) => {
    if (newRole === user.role) return;

    const result = await Swal.fire({
      title: "Change User Role?",
      text: `Change ${user.name}'s role from "${user.role}" to "${newRole}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3B82F6",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, Change",
      cancelButtonText: "Cancel",
      background: "#ffffff",
      customClass: {
        popup: "rounded-2xl shadow-2xl",
        confirmButton: "rounded-xl px-6 py-3",
        cancelButton: "rounded-xl px-6 py-3",
      },
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        const res = await axiosSecure.patch(`/users/role/${user.email}`, {
          role: newRole,
        });

        if (res.data.modifiedCount > 0) {
          await Swal.fire({
            title: "Success!",
            text: `Role changed to "${newRole}" successfully.`,
            icon: "success",
            confirmButtonColor: "#10B981",
            customClass: {
              popup: "rounded-2xl shadow-2xl",
              confirmButton: "rounded-xl px-6 py-3",
            },
          });
          fetchUsers();
        } else {
          Swal.fire({
            title: "No Change",
            text: "Role was not updated.",
            icon: "info",
            confirmButtonColor: "#3B82F6",
            customClass: {
              popup: "rounded-2xl shadow-2xl",
              confirmButton: "rounded-xl px-6 py-3",
            },
          });
        }
      } catch (err) {
        console.error("Role update error:", err);
        Swal.fire({
          title: "Error!",
          text: "Could not update role.",
          icon: "error",
          confirmButtonColor: "#EF4444",
          customClass: {
            popup: "rounded-2xl shadow-2xl",
            confirmButton: "rounded-xl px-6 py-3",
          },
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <FaCrown className="text-yellow-500" />;
      case "member":
        return <FaTrophy className="text-blue-500" />;
      default:
        return <FaUser className="text-gray-500" />;
    }
  };

  const getRoleBadge = (role) => {
    const baseClasses =
      "px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1";
    switch (role) {
      case "admin":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case "member":
        return `${baseClasses} bg-blue-100 text-blue-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getRoleStats = () => {
    const adminCount = users.filter((u) => u.role === "admin").length;
    const memberCount = users.filter((u) => u.role === "member").length;
    const userCount = users.filter((u) => u.role === "user").length;

    return { adminCount, memberCount, userCount };
  };

  const { adminCount, memberCount, userCount } = getRoleStats();

  if (loading) {
    return (
      <div
        className={`min-h-screen ${
          darkmode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
            : "bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50"
        } flex items-center justify-center`}
      >
        <Loading />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        darkmode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50"
      } relative overflow-hidden`}
    >
      {/* Background Decorations */}
      <div
        className={`absolute inset-0 ${
          darkmode
            ? "bg-gradient-to-r from-gray-700/10 to-gray-600/10"
            : "bg-gradient-to-r from-blue-600/5 to-purple-600/5"
        }`}
      ></div>
      <div
        className={`absolute top-0 left-0 w-96 h-96 ${
          darkmode
            ? "bg-gradient-to-br from-gray-600/20 to-transparent"
            : "bg-gradient-to-br from-blue-400/10 to-transparent"
        } rounded-full -translate-x-48 -translate-y-48`}
      ></div>
      <div
        className={`absolute bottom-0 right-0 w-96 h-96 ${
          darkmode
            ? "bg-gradient-to-tl from-gray-600/20 to-transparent"
            : "bg-gradient-to-tl from-purple-400/10 to-transparent"
        } rounded-full translate-x-48 translate-y-48`}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 flex items-center justify-center space-x-3">
            <MdPeople className="text-blue-600" />
            <span>All Users</span>
          </h1>
          <p
            className={`text-xl ${
              darkmode ? "text-gray-300" : "text-gray-600"
            } max-w-2xl mx-auto`}
          >
            Comprehensive user management with role-based access control and
            advanced filtering
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <StatsCard
            title="Total Users"
            value={users.length}
            icon={<FaUsers />}
            color="from-blue-500 to-cyan-500"
            bgColor={
              darkmode ? "from-gray-800 to-gray-700" : "from-blue-50 to-cyan-50"
            }
            darkmode={darkmode}
          />
          <StatsCard
            title="Admins"
            value={adminCount}
            icon={<FaCrown />}
            color="from-yellow-500 to-orange-500"
            bgColor={
              darkmode
                ? "from-gray-800 to-gray-700"
                : "from-yellow-50 to-orange-50"
            }
            darkmode={darkmode}
          />
          <StatsCard
            title="Members"
            value={memberCount}
            icon={<FaTrophy />}
            color="from-blue-500 to-indigo-500"
            bgColor={
              darkmode
                ? "from-gray-800 to-gray-700"
                : "from-blue-50 to-indigo-50"
            }
            darkmode={darkmode}
          />
          <StatsCard
            title="Regular Users"
            value={userCount}
            icon={<FaUser />}
            color="from-gray-500 to-slate-500"
            bgColor={
              darkmode
                ? "from-gray-800 to-gray-700"
                : "from-gray-50 to-slate-50"
            }
            darkmode={darkmode}
          />
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`${
            darkmode
              ? "bg-gray-800/80 border-gray-700/50"
              : "bg-white/80 border-white/20"
          } backdrop-blur-sm rounded-3xl p-6 shadow-2xl border mb-8`}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex items-center space-x-3">
              <MdFilterList className="text-2xl text-blue-600" />
              <h3
                className={`text-lg font-semibold ${
                  darkmode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Controls
              </h3>
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <MdSearch
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    darkmode ? "text-gray-500" : "text-gray-400"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  className={`w-full pl-10 pr-4 py-3 border ${
                    darkmode
                      ? "border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:border-blue-500"
                      : "border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500"
                  } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  value={searchText}
                  onChange={handleSearch}
                />
              </div>

              <select
                className={`px-4 py-3 border ${
                  darkmode
                    ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-blue-500"
                    : "border-gray-200 bg-white text-gray-900 focus:border-blue-500"
                } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="member">Member</option>
                <option value="user">User</option>
              </select>

              <select
                className={`px-4 py-3 border ${
                  darkmode
                    ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-blue-500"
                    : "border-gray-200 bg-white text-gray-900 focus:border-blue-500"
                } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="email">Sort by Email</option>
                <option value="role">Sort by Role</option>
              </select>

              <div className="hidden md:flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode("table")}
                  className={`p-3 rounded-xl transition-all ${
                    viewMode === "table"
                      ? "bg-blue-500 text-white shadow-lg"
                      : darkmode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <MdViewList />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode("cards")}
                  className={`p-3 rounded-xl transition-all ${
                    viewMode === "cards"
                      ? "bg-blue-500 text-white shadow-lg"
                      : darkmode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <MdViewModule />
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchUsers}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
              >
                <MdRefresh />
                <span>Refresh</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Users List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {filteredUsers.length === 0 ? (
            <div
              className={`${
                darkmode
                  ? "bg-gray-800/80 border-gray-700/50"
                  : "bg-white/80 border-white/20"
              } backdrop-blur-sm rounded-3xl p-12 shadow-2xl border text-center`}
            >
              <MdPeople
                className={`text-6xl ${
                  darkmode ? "text-gray-600" : "text-gray-300"
                } mx-auto mb-4`}
              />
              <h3
                className={`text-2xl font-bold ${
                  darkmode ? "text-gray-300" : "text-gray-600"
                } mb-2`}
              >
                No Users Found
              </h3>
              <p className={`${darkmode ? "text-gray-400" : "text-gray-500"}`}>
                {searchText || roleFilter !== "all"
                  ? "Try adjusting your filters to see more results."
                  : "No users have been registered yet."}
              </p>
            </div>
          ) : (
            <>
              {/* Table View - Hidden on mobile */}
              {viewMode === "table" && (
                <div
                  className={`hidden md:block ${
                    darkmode
                      ? "bg-gray-800/80 border-gray-700/50"
                      : "bg-white/80 border-white/20"
                  } backdrop-blur-sm rounded-3xl shadow-2xl border overflow-hidden`}
                >
                  <div className="max-h-[600px] overflow-y-auto">
                    <table className="w-full">
                      <thead
                        className={`${
                          darkmode
                            ? "bg-gradient-to-r from-gray-700 to-gray-600"
                            : "bg-gradient-to-r from-blue-50 to-purple-50"
                        } sticky top-0 z-10`}
                      >
                        <tr>
                          <th
                            className={`px-6 py-4 text-left text-sm font-semibold ${
                              darkmode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            User
                          </th>
                          <th
                            className={`px-6 py-4 text-left text-sm font-semibold ${
                              darkmode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Email
                          </th>
                          <th
                            className={`px-6 py-4 text-left text-sm font-semibold ${
                              darkmode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Role
                          </th>
                          <th
                            className={`px-6 py-4 text-left text-sm font-semibold ${
                              darkmode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        className={`divide-y ${
                          darkmode ? "divide-gray-700" : "divide-gray-100"
                        }`}
                      >
                        <AnimatePresence>
                          {filteredUsers.map((user, index) => (
                            <motion.tr
                              key={user.email}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ delay: index * 0.1 }}
                              className={`${
                                darkmode
                                  ? "hover:bg-gray-700/50"
                                  : "hover:bg-blue-50/50"
                              } transition-colors`}
                            >
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-3">
                                  <div
                                    className={`p-2 ${
                                      darkmode
                                        ? "bg-blue-900/50"
                                        : "bg-blue-100"
                                    } rounded-full`}
                                  >
                                    <MdPerson className="text-blue-600" />
                                  </div>
                                  <span
                                    className={`font-medium ${
                                      darkmode
                                        ? "text-gray-100"
                                        : "text-gray-900"
                                    }`}
                                  >
                                    {user.name}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                  <MdEmail
                                    className={`${
                                      darkmode
                                        ? "text-gray-500"
                                        : "text-gray-400"
                                    }`}
                                  />
                                  <span
                                    className={`${
                                      darkmode
                                        ? "text-gray-300"
                                        : "text-gray-700"
                                    }`}
                                  >
                                    {user.email}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className={getRoleBadge(user.role)}>
                                  {getRoleIcon(user.role)}
                                  <span className="capitalize">
                                    {user.role}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex space-x-2">
                                  <select
                                    className={`px-3 py-2 border ${
                                      darkmode
                                        ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-blue-500"
                                        : "border-gray-200 bg-white text-gray-900 focus:border-blue-500"
                                    } rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                    value={user.role}
                                    onChange={(e) =>
                                      handleRoleChange(user, e.target.value)
                                    }
                                  >
                                    <option value="user">User</option>
                                    <option value="member">Member</option>
                                    <option value="admin">Admin</option>
                                  </select>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() =>
                                      handleDeleteUser(user.email, user.name)
                                    }
                                    className="px-3 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-1"
                                  >
                                    <FaTrash />
                                  </motion.button>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Card View - Always visible on mobile, conditional on desktop */}
              <div
                className={`${
                  viewMode === "table" ? "block md:hidden" : "block"
                } grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}
              >
                <AnimatePresence>
                  {filteredUsers.map((user, index) => (
                    <motion.div
                      key={user.email}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.1 }}
                      className={`${
                        darkmode
                          ? "bg-gray-800/80 border-gray-700/50 hover:shadow-gray-900/50"
                          : "bg-white/80 border-white/20 hover:shadow-3xl"
                      } backdrop-blur-sm rounded-3xl p-6 shadow-2xl border transition-all duration-300`}
                    >
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                          <MdPerson className="text-2xl text-white" />
                        </div>
                        <h3
                          className={`text-lg font-bold ${
                            darkmode ? "text-gray-100" : "text-gray-800"
                          }`}
                        >
                          {user.name}
                        </h3>
                        <div
                          className={`inline-flex ${getRoleBadge(
                            user.role
                          )} mt-2`}
                        >
                          {getRoleIcon(user.role)}
                          <span className="capitalize">{user.role}</span>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div
                          className={`flex items-center space-x-2 text-sm ${
                            darkmode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          <MdEmail className="text-blue-500" />
                          <span className="truncate">{user.email}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <select
                          className={`w-full px-3 py-2 border ${
                            darkmode
                              ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-blue-500"
                              : "border-gray-200 bg-white text-gray-900 focus:border-blue-500"
                          } rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                          value={user.role}
                          onChange={(e) =>
                            handleRoleChange(user, e.target.value)
                          }
                        >
                          <option value="user">User</option>
                          <option value="member">Member</option>
                          <option value="admin">Admin</option>
                        </select>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() =>
                            handleDeleteUser(user.email, user.name)
                          }
                          className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                          <FaTrash />
                          <span>Delete User</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const StatsCard = ({ title, value, icon, color, bgColor, darkmode }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className={`bg-gradient-to-br ${bgColor} p-6 rounded-3xl shadow-xl border ${
      darkmode ? "border-gray-700/50" : "border-white/20"
    } relative overflow-hidden`}
  >
    <div
      className={`absolute top-0 right-0 w-20 h-20 ${
        darkmode ? "bg-gray-600/10" : "bg-white/10"
      } rounded-full -translate-y-10 translate-x-10`}
    ></div>
    <div className="relative z-10 flex items-center space-x-4">
      <div
        className={`p-4 bg-gradient-to-br ${color} text-white rounded-2xl shadow-lg`}
      >
        <div className="text-2xl">{icon}</div>
      </div>
      <div>
        <h4
          className={`text-sm font-semibold ${
            darkmode ? "text-gray-400" : "text-gray-600"
          } mb-1`}
        >
          {title}
        </h4>
        <p
          className={`text-3xl font-bold ${
            darkmode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  </motion.div>
);

export default AllUsers;
