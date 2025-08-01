import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  FaImage,
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillWave,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";

const AddCourtForm = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxios();
  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/courts", data);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Court Added Successfully", "success");
        reset();
        onClose(); // Close the modal after successful add
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-gradient-to-br from-blue-50 to-purple-100 p-6 rounded-2xl shadow-lg w-full max-w-xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold text-center text-primary">
        ➕ Add New Court
      </h2>

      {/* Image URL */}
      <div className="form-control">
        <label className="label font-semibold flex items-center gap-2 text-blue-700">
          <FaImage /> Court Image URL
        </label>
        <input
          type="text"
          placeholder="https://example.com/image.jpg"
          {...register("image", { required: true })}
          className="input input-bordered w-full"
        />
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">Image URL is required</p>
        )}
      </div>

      {/* Court Type */}
      <div className="form-control">
        <label className="label font-semibold flex items-center gap-2 text-blue-700">
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
        <label className="label font-semibold flex items-center gap-2 text-blue-700">
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
        <label className="label font-semibold flex items-center gap-2 text-blue-700">
          <FaMoneyBillWave /> Price (৳)
        </label>
        <input
          type="number"
          placeholder="500"
          {...register("price", { required: true })}
          className="input input-bordered w-full"
        />
        {errors.price && (
          <p className="text-red-500 text-sm mt-1">Price is required</p>
        )}
      </div>

      {/* Submit */}
      <div className="text-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary px-6"
        >
          Add Court
        </motion.button>
      </div>
    </motion.form>
  );
};

export default AddCourtForm;
