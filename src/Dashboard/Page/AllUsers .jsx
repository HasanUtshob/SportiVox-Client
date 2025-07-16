import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users?role=users");
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = users.filter(
      (user) =>
        user.name?.toLowerCase().includes(value) ||
        user.email?.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

  const handleRoleChange = async (email, newRole) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/users/role/${email}`,
        { role: newRole }
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", `Role updated to "${newRole}"`, "success");
        fetchUsers(); // Refresh list
      } else {
        Swal.fire("No Change", "Role was not updated.", "info");
      }
    } catch (err) {
      console.error("Role update error:", err);
      Swal.fire("Error", "Could not update role.", "error");
    }
  };

  const handleDeleteUser = async (email) => {
    const result = await Swal.fire({
      title: "Delete User?",
      text: `This will permanently remove ${email}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`http://localhost:5000/users/${email}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "User has been removed.", "success");
          fetchUsers();
        } else {
          Swal.fire("Not Found", "No user found to delete.", "info");
        }
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire("Error", "Could not delete user", "error");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        All Users
      </h2>

      <div className="mb-5 text-center">
        <input
          type="text"
          value={searchText}
          onChange={handleSearch}
          placeholder="Search by name or email"
          className="input input-bordered w-full max-w-md"
        />
      </div>

      {loading ? (
        <p className="text-center">Loading users...</p>
      ) : filteredUsers.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="bg-gray-100 uppercase text-sm">Name</th>
                <th className="bg-gray-100 uppercase text-sm">Email</th>
                <th className="bg-gray-100 uppercase text-sm">Role</th>
                <th className="bg-gray-100 uppercase text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, i) => (
                <tr key={i}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      className="select select-bordered select-sm"
                      value={user.role}
                      onChange={(e) => {
                        const newRole = e.target.value;
                        if (newRole !== user.role) {
                          Swal.fire({
                            title: "Are you sure?",
                            text: `Do you want to change role to "${newRole}"?`,
                            icon: "question",
                            showCancelButton: true,
                            confirmButtonText: "Yes, change it!",
                            cancelButtonText: "Cancel",
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              try {
                                const res = await axios.patch(
                                  `http://localhost:5000/users/role/${user.email}`,
                                  { role: newRole }
                                );

                                if (res.data.modifiedCount > 0) {
                                  Swal.fire(
                                    "Success!",
                                    `Role changed to "${newRole}".`,
                                    "success"
                                  );
                                  fetchUsers(); // refresh the list
                                } else {
                                  Swal.fire(
                                    "No Change",
                                    "Role was not updated.",
                                    "info"
                                  );
                                }
                              } catch (err) {
                                console.error("Role update error:", err);
                                Swal.fire(
                                  "Error",
                                  "Could not update role.",
                                  "error"
                                );
                              }
                            }
                          });
                        }
                      }}
                    >
                      <option value="user">user</option>
                      <option value="member">member</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user.email)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
