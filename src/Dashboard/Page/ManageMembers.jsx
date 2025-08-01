import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import Loading from "../../Component/Loading";

const ManageMembers = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const axiosSecure = useAxios();

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/members");
      setMembers(res.data);
      setFilteredMembers(res.data);
    } catch (err) {
      console.error("Error fetching members:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDeleteMember = async (email) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `This will remove all bookings and user data for ${email}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/members/${email}`);

        if (
          res.data.deletedCount > 0 ||
          res.data.message === "Deleted successfully"
        ) {
          Swal.fire("Deleted!", "Member has been removed.", "success");
          const updated = members.filter((m) => m.userEmail !== email);
          setMembers(updated);
          setFilteredMembers(updated);
        } else {
          Swal.fire("Not Found", "No member data found to delete.", "info");
        }
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    const filtered = members.filter((member) =>
      member.userName.toLowerCase().includes(value)
    );
    setFilteredMembers(filtered);
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg text-gray-600">
        <Loading></Loading>
      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        Manage Members
      </h2>

      <div className="mb-4 text-center">
        <input
          type="text"
          value={searchText}
          onChange={handleSearch}
          placeholder="Search by name"
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      {loading ? (
        <p className="text-center">Loading members...</p>
      ) : filteredMembers.length === 0 ? (
        <p className="text-center text-gray-500">No members found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="bg-gray-100 uppercase text-sm">Name</th>
                <th className="bg-gray-100 uppercase text-sm">Email</th>
                <th className="bg-gray-100 uppercase text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((m, index) => (
                <tr key={index}>
                  <td>{m.userName}</td>
                  <td>{m.userEmail}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteMember(m.userEmail)}
                      className="btn btn-sm btn-error"
                    >
                      Remove
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

export default ManageMembers;
