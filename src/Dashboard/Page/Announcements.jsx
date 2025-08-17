import React, { useEffect, useState, useContext } from "react";
import {
  FaBullhorn,
  FaSearch,
  FaCalendarAlt,
  FaEye,
  FaTimes,
  FaNewspaper,
  FaClock,
} from "react-icons/fa";
import {
  MdAnnouncement,
  MdRefresh,
  MdFilterList,
  MdVisibility,
  MdDateRange,
  MdMessage,
} from "react-icons/md";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";
import useAxios from "../../hooks/useAxios";
import Loading from "../../Component/Loading";
import { Themecontext } from "../../Context/ThemeContext";

const Announcements = () => {
  const { darkmode } = useContext(Themecontext);
  const [announcements, setAnnouncements] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxios();
  const perPage = 6;

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get("/announcements");
        setAnnouncements(res.data.reverse());
      } catch (err) {
        console.error("Failed to fetch announcements", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [axiosSecure]);

  const filtered = announcements.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const getRecentAnnouncements = () => {
    const today = moment();
    return announcements.filter((announcement) =>
      moment(announcement.date).isAfter(today.subtract(7, "days"))
    ).length;
  };

  const getTotalAnnouncements = () => announcements.length;

  const getThisMonthAnnouncements = () => {
    const thisMonth = moment().startOf("month");
    return announcements.filter((announcement) =>
      moment(announcement.date).isAfter(thisMonth)
    ).length;
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen ${
          darkmode
            ? "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
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
          ? "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50"
      } relative overflow-hidden`}
    >
      {/* Background Decorations */}
      <div
        className={`absolute inset-0 ${
          darkmode
            ? "bg-gradient-to-r from-blue-800/10 to-purple-800/10"
            : "bg-gradient-to-r from-blue-600/5 to-purple-600/5"
        }`}
      ></div>
      <div
        className={`absolute top-0 left-0 w-96 h-96 ${
          darkmode
            ? "bg-gradient-to-br from-blue-600/5 to-transparent"
            : "bg-gradient-to-br from-blue-400/10 to-transparent"
        } rounded-full -translate-x-48 -translate-y-48`}
      ></div>
      <div
        className={`absolute bottom-0 right-0 w-96 h-96 ${
          darkmode
            ? "bg-gradient-to-tl from-purple-600/5 to-transparent"
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
          <h1
            className={`text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center space-x-3 ${
              darkmode
                ? "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            }`}
          >
            <MdAnnouncement
              className={`${darkmode ? "text-blue-400" : "text-blue-600"}`}
            />
            <span>Announcements</span>
          </h1>
          <p
            className={`text-xl max-w-2xl mx-auto ${
              darkmode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Stay updated with the latest news and important announcements
          </p>
          <div
            className={`w-24 h-1 mx-auto mt-4 rounded-full ${
              darkmode
                ? "bg-gradient-to-r from-blue-400 to-purple-500"
                : "bg-gradient-to-r from-blue-500 to-purple-600"
            }`}
          ></div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <StatsCard
            title="Total Announcements"
            value={getTotalAnnouncements()}
            icon={<FaNewspaper />}
            color="from-blue-500 to-cyan-500"
            bgColor={
              darkmode
                ? "from-blue-900/30 to-cyan-900/30"
                : "from-blue-50 to-cyan-50"
            }
          />
          <StatsCard
            title="This Month"
            value={getThisMonthAnnouncements()}
            icon={<FaCalendarAlt />}
            color="from-green-500 to-emerald-500"
            bgColor={
              darkmode
                ? "from-green-900/30 to-emerald-900/30"
                : "from-green-50 to-emerald-50"
            }
          />
          <StatsCard
            title="Recent (7 days)"
            value={getRecentAnnouncements()}
            icon={<FaClock />}
            color="from-purple-500 to-pink-500"
            bgColor={
              darkmode
                ? "from-purple-900/30 to-pink-900/30"
                : "from-purple-50 to-pink-50"
            }
          />
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`${
            darkmode
              ? "bg-gray-800/90 border-gray-700/50"
              : "bg-white/80 border-white/20"
          } backdrop-blur-sm rounded-3xl p-6 shadow-2xl border mb-8`}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center space-x-3">
              <MdFilterList
                className={`text-2xl ${
                  darkmode ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <h3
                className={`text-lg font-semibold ${
                  darkmode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Search & Filter
              </h3>
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <FaSearch
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    darkmode ? "text-gray-500" : "text-gray-400"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Search announcements by title..."
                  className={`w-full pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    darkmode
                      ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                      : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
                  } border`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
              >
                <MdRefresh />
                <span>Refresh</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Announcements Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {filtered.length === 0 ? (
            <div
              className={`${
                darkmode
                  ? "bg-gray-800/90 border-gray-700/50"
                  : "bg-white/80 border-white/20"
              } backdrop-blur-sm rounded-3xl p-12 shadow-2xl border text-center`}
            >
              <FaBullhorn
                className={`text-6xl mx-auto mb-4 ${
                  darkmode ? "text-gray-600" : "text-gray-300"
                }`}
              />
              <h3
                className={`text-2xl font-bold mb-2 ${
                  darkmode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {search ? "No Matching Announcements" : "No Announcements"}
              </h3>
              <p className={`${darkmode ? "text-gray-400" : "text-gray-500"}`}>
                {search
                  ? "Try adjusting your search terms to find more results."
                  : "No announcements have been posted yet."}
              </p>
              {search && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearch("")}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Clear Search
                </motion.button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <AnimatePresence>
                  {paginated.map((item, index) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className={`${
                        darkmode
                          ? "bg-gray-800/90 border-gray-700/50"
                          : "bg-white/80 border-white/20"
                      } backdrop-blur-sm rounded-3xl p-6 shadow-2xl border relative overflow-hidden group cursor-pointer`}
                    >
                      {/* Card Background Decoration */}
                      <div
                        className={`absolute top-0 right-0 w-20 h-20 ${
                          darkmode
                            ? "bg-gradient-to-br from-blue-600/10 to-purple-600/10"
                            : "bg-gradient-to-br from-blue-400/10 to-purple-400/10"
                        } rounded-full -translate-y-10 translate-x-10`}
                      ></div>

                      <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl">
                              <FaBullhorn className="text-sm" />
                            </div>
                            <div
                              className={`text-xs font-medium ${
                                darkmode ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              ANNOUNCEMENT
                            </div>
                          </div>
                          <div
                            className={`flex items-center space-x-1 text-xs ${
                              darkmode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            <MdDateRange />
                            <span>
                              {moment(item.date).format("MMM DD, YYYY")}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="mb-4">
                          <h3
                            className={`text-lg font-bold mb-2 line-clamp-2 transition-colors ${
                              darkmode
                                ? "text-gray-100 group-hover:text-blue-400"
                                : "text-gray-800 group-hover:text-blue-600"
                            }`}
                          >
                            {item.title}
                          </h3>
                          <div
                            className={`flex items-center space-x-2 text-sm mb-3 ${
                              darkmode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            <FaClock />
                            <span>{moment(item.date).format("h:mm A")}</span>
                            <span>•</span>
                            <span>{moment(item.date).fromNow()}</span>
                          </div>
                          <p
                            className={`line-clamp-3 text-sm leading-relaxed ${
                              darkmode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            {item.message ||
                              item.description ||
                              (item.content
                                ? item.content.substring(0, 150) + "..."
                                : "Click to view announcement details")}
                          </p>
                        </div>

                        {/* Action Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelected(item)}
                          className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                          <MdVisibility />
                          <span>View Details</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Modern Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className={`${
                    darkmode
                      ? "bg-gray-800/90 border-gray-700/50"
                      : "bg-white/80 border-white/20"
                  } backdrop-blur-sm rounded-3xl p-6 shadow-2xl border`}
                >
                  <div className="flex flex-wrap justify-center items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                        currentPage === 1
                          ? `${
                              darkmode
                                ? "bg-gray-700 text-gray-500"
                                : "bg-gray-100 text-gray-400"
                            } cursor-not-allowed`
                          : "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl"
                      }`}
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                      « Previous
                    </motion.button>

                    <div className="flex gap-1">
                      {[...Array(totalPages).keys()].map((n) => (
                        <motion.button
                          key={n}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className={`w-10 h-10 rounded-xl font-semibold transition-all duration-300 ${
                            currentPage === n + 1
                              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                              : `${
                                  darkmode
                                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600"
                                    : "bg-white text-gray-600 hover:bg-gray-50 border-gray-200"
                                } border`
                          }`}
                          onClick={() => setCurrentPage(n + 1)}
                        >
                          {n + 1}
                        </motion.button>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                        currentPage === totalPages
                          ? `${
                              darkmode
                                ? "bg-gray-700 text-gray-500"
                                : "bg-gray-100 text-gray-400"
                            } cursor-not-allowed`
                          : "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl"
                      }`}
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                      Next »
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </motion.div>

        {/* Enhanced Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            >
              <motion.div
                className={`${
                  darkmode
                    ? "bg-gray-800/95 border-gray-700/50"
                    : "bg-white/95 border-white/20"
                } backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative border`}
                initial={{ y: 50, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 50, opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => setSelected(null)}
                >
                  <FaTimes />
                </motion.button>

                {/* Modal Header */}
                <div className="mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl">
                      <FaBullhorn className="text-xl" />
                    </div>
                    <div>
                      <div
                        className={`text-sm font-medium ${
                          darkmode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        ANNOUNCEMENT
                      </div>
                      <div
                        className={`text-xs ${
                          darkmode ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        {moment(selected.date).format(
                          "dddd, MMMM D, YYYY • h:mm A"
                        )}
                      </div>
                    </div>
                  </div>

                  <h3
                    className={`text-3xl font-bold mb-2 ${
                      darkmode
                        ? "bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                    }`}
                  >
                    {selected.title}
                  </h3>

                  <div
                    className={`flex items-center space-x-4 text-sm ${
                      darkmode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    <div className="flex items-center space-x-1">
                      <MdDateRange />
                      <span>
                        {moment(selected.date).format("MMM DD, YYYY")}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaClock />
                      <span>{moment(selected.date).fromNow()}</span>
                    </div>
                  </div>
                </div>

                {/* Modal Content */}
                <div
                  className={`rounded-2xl p-6 border ${
                    darkmode
                      ? "bg-gradient-to-br from-gray-700/50 to-blue-900/30 border-gray-600"
                      : "bg-gradient-to-br from-gray-50 to-blue-50 border-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <MdMessage
                      className={`${
                        darkmode ? "text-blue-400" : "text-blue-600"
                      }`}
                    />
                    <span
                      className={`font-semibold ${
                        darkmode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Message
                    </span>
                  </div>
                  <p
                    className={`whitespace-pre-line leading-relaxed ${
                      darkmode ? "text-gray-300" : "text-gray-800"
                    }`}
                  >
                    {selected.message ||
                      selected.description ||
                      selected.content ||
                      "No message content available for this announcement."}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const StatsCard = ({ title, value, icon, color, bgColor }) => {
  const { darkmode } = useContext(Themecontext);

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className={`bg-gradient-to-br ${bgColor} p-6 rounded-3xl shadow-xl ${
        darkmode ? "border-gray-700/50" : "border-white/20"
      } border relative overflow-hidden`}
    >
      <div
        className={`absolute top-0 right-0 w-20 h-20 ${
          darkmode ? "bg-white/5" : "bg-white/10"
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
            className={`text-sm font-semibold mb-1 ${
              darkmode ? "text-gray-400" : "text-gray-600"
            }`}
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
};

export default Announcements;
