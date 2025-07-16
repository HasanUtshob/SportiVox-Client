import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  FaImage,
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillWave,
  FaEdit,
} from "react-icons/fa";

const UpdateCourtForm = ({ court, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      image: court.image,
      type: court.type,
      slot: court.slot,
      price: court.price,
    },
  });
  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/courts/${court._id}`,
        data
      );
      if (response.data.modifiedCount > 0) {
        Swal.fire("Success", "Court updated successfully", "success");
        onClose();
      } else {
        Swal.fire("No changes made", "Try modifying some fields", "info");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong!", "error");
      console.error("Update Error:", err);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-gradient-to-br from-emerald-50 to-blue-100 p-6 rounded-2xl shadow-lg w-full max-w-xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold text-center text-green-700 flex items-center justify-center gap-2">
        <FaEdit /> Update Court
      </h2>

      {/* Court Image */}
      <div className="form-control">
        <label className="label font-semibold text-emerald-800 flex items-center gap-2">
          <FaImage /> Court Image URL
        </label>
        <input
          {...register("image", { required: true })}
          placeholder="https://example.com/image.jpg"
          className="input input-bordered w-full"
        />
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">Image is required</p>
        )}
      </div>

      {/* Court Type */}
      <div className="form-control">
        <label className="label font-semibold text-emerald-800 flex items-center gap-2">
          <FaMapMarkerAlt /> Court Type
        </label>
        <select
          {...register("type", { required: true })}
          className="select select-bordered w-full"
        >
          <option value="">-- Select Type --</option>
          <option value="Tennis">🎾 Tennis</option>
          <option value="Badminton">🏸 Badminton</option>
          <option value="Squash">🥎 Squash</option>
        </select>
        {errors.type && (
          <p className="text-red-500 text-sm mt-1">Court type is required</p>
        )}
      </div>

      {/* Slot Time */}
      <div className="form-control">
        <label className="label font-semibold text-emerald-800 flex items-center gap-2">
          <FaClock /> Slot Time
        </label>
        <select
          {...register("slot", { required: true })}
          className="select select-bordered w-full"
        >
          <option value="">-- Choose Slot --</option>
          <option value="8:00 AM - 9:00 AM">8:00 AM - 9:00 AM</option>
          <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
          <option value="7:00 PM - 8:00 PM">7:00 PM - 8:00 PM</option>
        </select>
        {errors.slot && (
          <p className="text-red-500 text-sm mt-1">Slot time is required</p>
        )}
      </div>

      {/* Price */}
      <div className="form-control">
        <label className="label font-semibold text-emerald-800 flex items-center gap-2">
          <FaMoneyBillWave /> Price (৳)
        </label>
        <input
          {...register("price", { required: true })}
          type="number"
          placeholder="Enter Price"
          className="input input-bordered w-full"
        />
        {errors.price && (
          <p className="text-red-500 text-sm mt-1">Price is required</p>
        )}
      </div>

      {/* Update Button */}
      <div className="text-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-success px-6"
        >
          Update
        </motion.button>
      </div>
    </motion.form>
  );
};

export default UpdateCourtForm;
