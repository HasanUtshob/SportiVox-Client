import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import moment from "moment";
import useAxios from "../../hooks/useAxios";
import Loading from "../../Component/Loading";

const ManageAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxios();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/announcements");
      setAnnouncements(res.data.reverse());
      setFiltered(res.data.reverse());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const result = announcements.filter((a) =>
      a.title.toLowerCase().includes(value)
    );
    setFiltered(result);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the announcement.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/announcements/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Announcement deleted", "success");
          fetchAnnouncements();
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete", "error");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      return Swal.fire("Warning", "Fill in all fields", "warning");
    }

    const payload = {
      ...formData,
      date: new Date(),
    };

    try {
      if (editingId) {
        await axiosSecure.patch(`/announcements/${editingId}`, payload);
        Swal.fire("Updated", "Announcement updated", "success");
      } else {
        await axiosSecure.post("/announcements", payload);
        Swal.fire("Added", "Announcement posted", "success");
      }

      setFormData({ title: "", description: "" });
      setEditingId(null);
      setModalOpen(false);
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to save", "error");
    }
  };

  const openModal = (announcement = null) => {
    if (announcement) {
      setFormData({
        title: announcement.title,
        description: announcement.description,
      });
      setEditingId(announcement._id);
    } else {
      setFormData({ title: "", description: "" });
      setEditingId(null);
    }
    setModalOpen(true);
  };

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg text-gray-600">
        <Loading></Loading>
      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-primary mb-6">
        📢 Manage Announcements
      </h2>

      {/* Search & Add */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          placeholder="Search by title"
          value={search}
          onChange={handleSearch}
        />
        <button className="btn btn-success ml-4" onClick={() => openModal()}>
          + Add Announcement
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-md">
        <table className="table w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((a) => (
              <tr key={a._id}>
                <td className="font-semibold">{a.title}</td>
                <td>{a.description}</td>
                <td>{moment(a.date).format("DD MMM YYYY, h:mm A")}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info mr-2"
                    onClick={() => openModal(a)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(a._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`btn btn-sm ${
              currentPage === i + 1 ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-md w-96 space-y-4 shadow-lg"
          >
            <h3 className="text-xl font-bold text-center text-primary">
              {editingId ? "Edit Announcement" : "Add Announcement"}
            </h3>
            <input
              type="text"
              placeholder="Title"
              className="input input-bordered w-full"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              className="textarea textarea-bordered w-full"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {editingId ? "Update" : "Post"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageAnnouncements;
