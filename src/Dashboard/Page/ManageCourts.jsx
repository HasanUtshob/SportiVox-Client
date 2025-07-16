import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import AddCourtForm from "./Component/AddCourtForm";
import UpdateCourtForm from "./Component/UpdateCourtForm";
import { motion } from "framer-motion";

const ManageCourts = () => {
  const [courts, setCourts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState(null); // for update modal

  const fetchCourts = async () => {
    const res = await axios.get("http://localhost:5000/courts");
    setCourts(res.data);
  };

  useEffect(() => {
    fetchCourts();
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This court will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (confirm.isConfirmed) {
      await axios.delete(`http://localhost:5000/courts/${id}`);
      fetchCourts();
      Swal.fire("Deleted!", "Court has been deleted.", "success");
    }
  };

  const handleEdit = (court) => {
    setSelectedCourt(court);
  };

  const closeModals = () => {
    setIsAddModalOpen(false);
    setSelectedCourt(null);
    fetchCourts();
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-primary">
        🏟️ Manage Courts
      </h2>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div></div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="btn btn-primary gap-2"
          onClick={() => setIsAddModalOpen(true)}
        >
          <FaPlus /> Add New Court
        </motion.button>
      </div>

      {/* Courts Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table table-zebra w-full text-sm sm:text-base">
          <thead className="bg-base-200 text-gray-700 font-semibold">
            <tr>
              <th>Image</th>
              <th>Type</th>
              <th>Slot</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courts?.length > 0 ? (
              courts.map((court) => (
                <tr key={court._id}>
                  <td>
                    <img
                      src={court.image}
                      alt="court"
                      className="w-16 h-12 rounded-lg object-cover shadow"
                    />
                  </td>
                  <td className="font-medium text-primary">{court.type}</td>
                  <td>{court.slot}</td>
                  <td className="font-semibold text-green-600">
                    ৳{court.price}
                  </td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => handleEdit(court)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(court._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No courts available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Court Modal */}
      {isAddModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-xl p-6 w-full max-w-xl relative shadow-xl"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <button
              onClick={closeModals}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              ✕
            </button>
            <AddCourtForm onClose={closeModals} />
          </motion.div>
        </motion.div>
      )}

      {/* Update Court Modal */}
      {selectedCourt && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-xl p-6 w-full max-w-xl relative shadow-xl"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <button
              onClick={closeModals}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              ✕
            </button>
            <UpdateCourtForm court={selectedCourt} onClose={closeModals} />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ManageCourts;
