import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBullhorn, FaSearch } from "react-icons/fa";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 4;

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("http://localhost:5000/announcements");
      setAnnouncements(res.data.reverse());
    } catch (err) {
      console.error("Failed to fetch announcements", err);
    }
  };

  const filtered = announcements.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center text-primary mb-6 flex items-center justify-center gap-2">
        <FaBullhorn className="text-pink-500" /> Announcements
      </h2>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-2 w-full max-w-md">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search by title..."
            className="input input-bordered w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginated.map((item) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border shadow-md rounded-lg p-4 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold text-pink-600">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                {moment(item.date).format("MMMM D, YYYY • h:mm A")}
              </p>
              <p className="line-clamp-3 text-gray-700">
                {item.message || "No description available"}
              </p>
            </div>
            <div className="mt-4">
              <button
                className="btn btn-outline btn-sm btn-info w-full"
                onClick={() => setSelected(item)}
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center items-center gap-2">
        <button
          className="btn btn-sm btn-outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          « Prev
        </button>

        {[...Array(totalPages).keys()].map((n) => (
          <button
            key={n}
            className={`btn btn-sm ${
              currentPage === n + 1 ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setCurrentPage(n + 1)}
          >
            {n + 1}
          </button>
        ))}

        <button
          className="btn btn-sm btn-outline"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next »
        </button>
      </div>

      {/* View Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0  backdrop-blur-sm flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl p-6 w-11/12 md:w-2/3 lg:w-1/2 relative"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <button
                className="btn btn-sm btn-circle absolute top-2 right-2"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>
              <h3 className="text-2xl font-bold text-pink-600 mb-2">
                {selected.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {moment(selected.date).format("dddd, MMMM D, YYYY • h:mm A")}
              </p>
              <p className="whitespace-pre-line text-gray-800">
                {selected.message || "No message provided."}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Announcements;
