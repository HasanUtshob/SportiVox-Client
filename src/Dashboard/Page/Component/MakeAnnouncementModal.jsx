import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaBullhorn,
  FaEdit,
  FaPlus,
  FaExclamationCircle,
  FaCheck,
} from "react-icons/fa";

const MakeAnnouncementModal = ({
  isOpen,
  onClose,
  onSubmit,
  editingAnnouncement = null,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const maxTitleLength = 100;
  const maxDescriptionLength = 500;

  useEffect(() => {
    if (editingAnnouncement) {
      setFormData({
        title: editingAnnouncement.title || "",
        description: editingAnnouncement.description || "",
      });
    } else {
      setFormData({ title: "", description: "" });
    }
    setErrors({});
    setTouched({});
  }, [editingAnnouncement, isOpen]);

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "title":
        if (!value.trim()) {
          newErrors.title = "Title is required";
        } else if (value.length > maxTitleLength) {
          newErrors.title = `Title must be ${maxTitleLength} characters or less`;
        } else {
          delete newErrors.title;
        }
        break;
      case "description":
        if (!value.trim()) {
          newErrors.description = "Description is required";
        } else if (value.length > maxDescriptionLength) {
          newErrors.description = `Description must be ${maxDescriptionLength} characters or less`;
        } else {
          delete newErrors.description;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const titleValid = validateField("title", formData.title);
    const descriptionValid = validateField("description", formData.description);

    setTouched({ title: true, description: true });

    if (titleValid && descriptionValid) {
      onSubmit(formData);
    }
  };

  const handleClose = () => {
    setFormData({ title: "", description: "" });
    setErrors({});
    setTouched({});
    onClose();
  };

  const isEditing = !!editingAnnouncement;
  const titleLength = formData.title.length;
  const descriptionLength = formData.description.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isEditing ? (
                    <FaEdit className="text-2xl" />
                  ) : (
                    <FaPlus className="text-2xl" />
                  )}
                  <div>
                    <h3 className="text-2xl font-bold">
                      {isEditing
                        ? "Edit Announcement"
                        : "Create New Announcement"}
                    </h3>
                    <p className="text-blue-100 text-sm">
                      {isEditing
                        ? "Update your announcement details"
                        : "Share important information with your community"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                  disabled={isLoading}
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Title Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Announcement Title
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="Enter a compelling title..."
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none ${
                      errors.title && touched.title
                        ? "border-red-400 focus:border-red-500 bg-red-50"
                        : formData.title && !errors.title
                        ? "border-green-400 focus:border-green-500 bg-green-50"
                        : "border-gray-200 focus:border-blue-500 bg-gray-50 focus:bg-white"
                    }`}
                    disabled={isLoading}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {errors.title && touched.title ? (
                      <FaExclamationCircle className="text-red-500" />
                    ) : formData.title && !errors.title ? (
                      <FaCheck className="text-green-500" />
                    ) : null}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  {errors.title && touched.title && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <FaExclamationCircle className="text-xs" />
                      {errors.title}
                    </p>
                  )}
                  <div className="ml-auto">
                    <span
                      className={`text-xs ${
                        titleLength > maxTitleLength * 0.8
                          ? titleLength > maxTitleLength
                            ? "text-red-500"
                            : "text-yellow-500"
                          : "text-gray-400"
                      }`}
                    >
                      {titleLength}/{maxTitleLength}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Description
                </label>
                <div className="relative">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="Provide detailed information about your announcement..."
                    rows={6}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none resize-none ${
                      errors.description && touched.description
                        ? "border-red-400 focus:border-red-500 bg-red-50"
                        : formData.description && !errors.description
                        ? "border-green-400 focus:border-green-500 bg-green-50"
                        : "border-gray-200 focus:border-blue-500 bg-gray-50 focus:bg-white"
                    }`}
                    disabled={isLoading}
                  />
                  <div className="absolute right-3 top-3">
                    {errors.description && touched.description ? (
                      <FaExclamationCircle className="text-red-500" />
                    ) : formData.description && !errors.description ? (
                      <FaCheck className="text-green-500" />
                    ) : null}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  {errors.description && touched.description && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <FaExclamationCircle className="text-xs" />
                      {errors.description}
                    </p>
                  )}
                  <div className="ml-auto">
                    <span
                      className={`text-xs ${
                        descriptionLength > maxDescriptionLength * 0.8
                          ? descriptionLength > maxDescriptionLength
                            ? "text-red-500"
                            : "text-yellow-500"
                          : "text-gray-400"
                      }`}
                    >
                      {descriptionLength}/{maxDescriptionLength}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    isLoading ||
                    Object.keys(errors).length > 0 ||
                    !formData.title.trim() ||
                    !formData.description.trim()
                  }
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaBullhorn className="text-lg" />
                      {isEditing
                        ? "Update Announcement"
                        : "Publish Announcement"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MakeAnnouncementModal;
