import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxios from "../hooks/useAxios";

const BookingModal = ({ court, onClose, user }) => {
  const { handleSubmit } = useForm();
  const [slotsSelected, setSlotsSelected] = useState([]);
  const [date, setDate] = useState("");
  const axiosSecure = useAxios();

  const slotOptions = [
    "8:00 AM - 9:00 AM",
    "9:00 AM - 10:00 AM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
  ];

  const handleSlotChange = (e) => {
    const value = e.target.value;
    setSlotsSelected((prev) =>
      prev.includes(value)
        ? prev.filter((slot) => slot !== value)
        : [...prev, value]
    );
  };

  const totalPrice = slotsSelected.length * court.price;

  const onSubmit = async () => {
    const bookingData = {
      userEmail: user?.email,
      userName: user?.displayName,
      courtId: court._id,
      courtType: court.type,
      courtImage: court.image,
      date,
      slots: slotsSelected,
      price: totalPrice,
      status: "pending",
      paymentStatus: "unpaid",
    };

    try {
      await axiosSecure.post("/bookings", bookingData);
      Swal.fire("Success!", "Your booking request has been sent!", "success");
      onClose();
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Failed to book court", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-primary">
          Confirm Booking
        </h2>

        <div className="space-y-3">
          <img
            src={court.image}
            alt="Court"
            className="rounded-lg w-full h-40 object-cover"
          />

          <div>
            <p>
              <strong>Court Type:</strong> {court.type}
            </p>
            <p>
              <strong>Price per slot:</strong> ৳{court.price}
            </p>
          </div>

          <div className="form-control">
            <label className="label font-semibold flex items-center gap-2">
              <FaCalendarAlt /> Select Date
            </label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold flex items-center gap-2">
              <FaClock /> Select Slot(s)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {slotOptions.map((slot) => (
                <label key={slot} className="flex gap-2 items-center text-sm">
                  <input
                    type="checkbox"
                    value={slot}
                    checked={slotsSelected.includes(slot)}
                    onChange={handleSlotChange}
                    className="checkbox checkbox-primary"
                  />
                  {slot}
                </label>
              ))}
            </div>
          </div>

          <div className="text-right font-semibold text-lg">
            Total Price: ৳{totalPrice}
          </div>

          <button
            className="btn btn-success w-full mt-4"
            onClick={handleSubmit(onSubmit)}
            disabled={slotsSelected.length === 0 || !date}
          >
            Confirm Booking
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingModal;
