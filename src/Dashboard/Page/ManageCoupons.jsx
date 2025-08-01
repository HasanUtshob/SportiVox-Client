import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import Loading from "../../Component/Loading"; // নিশ্চিতভাবে import path ঠিক রাখবেন

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const axiosSecure = useAxios();

  // fetchCoupons ফাংশন component scope-এ রাখুন
  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/all_coupons");
      setCoupons(res.data);
    } catch (err) {
      console.error("Failed to fetch coupons", err);
      setCoupons([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, [axiosSecure]);

  const openModal = (coupon = null) => {
    if (coupon) {
      setNewCoupon({
        code: coupon.code,
        discount: coupon.value?.toString() || "",
        description: coupon.description || "",
      });
      setEditingId(coupon._id);
    } else {
      setNewCoupon({ code: "", discount: "", description: "" });
      setEditingId(null);
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { code, discount, description } = newCoupon;

    if (!code || !discount) {
      return Swal.fire("Warning", "Fill all required fields", "warning");
    }

    const percent = parseFloat(discount);
    if (isNaN(percent) || percent <= 0 || percent > 100) {
      return Swal.fire("Invalid", "Discount must be 1–100%", "error");
    }

    const payload = {
      code: code.trim().toUpperCase(),
      type: "percent",
      value: percent,
      description: description?.trim() || "",
    };

    try {
      if (editingId) {
        const res = await axiosSecure.patch(`/coupons/${editingId}`, payload);
        if (res.data.modifiedCount > 0) {
          Swal.fire("Updated", "Coupon updated successfully", "success");
          await fetchCoupons(); // লিস্ট রিফ্রেশ করুন
          setShowModal(false);
        }
      } else {
        const res = await axiosSecure.post("/coupons", payload);
        if (res.data.insertedId) {
          Swal.fire("Added", "Coupon added successfully", "success");
          await fetchCoupons(); // লিস্ট রিফ্রেশ করুন
          setShowModal(false);
        }
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the coupon permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/coupons/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted", "Coupon removed", "success");
          await fetchCoupons(); // লিস্ট রিফ্রেশ করুন
        }
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire("Error", "Failed to delete", "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg text-gray-600">
        <Loading />
      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">
        🏷️ Manage Coupons
      </h2>

      <div className="flex justify-end mb-4">
        <button onClick={() => openModal()} className="btn btn-success">
          + Add Coupon
        </button>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="table w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th>Code</th>
              <th>Discount (%)</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon._id}>
                <td className="font-semibold">{coupon.code}</td>
                <td>{coupon.value}%</td>
                <td>{coupon.description || "N/A"}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => openModal(coupon)}
                    className="btn btn-sm btn-info"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(coupon._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {coupons.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-gray-400 py-6">
                  No coupons found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-md w-96 space-y-4 shadow-lg"
          >
            <h3 className="text-xl font-bold text-center text-primary">
              {editingId ? "Edit Coupon" : "Add Coupon"}
            </h3>
            <input
              type="text"
              placeholder="Coupon Code"
              className="input input-bordered w-full"
              value={newCoupon.code}
              onChange={(e) =>
                setNewCoupon({ ...newCoupon, code: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Discount Percentage"
              className="input input-bordered w-full"
              value={newCoupon.discount}
              onChange={(e) =>
                setNewCoupon({ ...newCoupon, discount: e.target.value })
              }
            />
            <textarea
              placeholder="Coupon Description"
              className="textarea textarea-bordered w-full"
              value={newCoupon.description}
              onChange={(e) =>
                setNewCoupon({ ...newCoupon, description: e.target.value })
              }
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setShowModal(false);
                  setNewCoupon({ code: "", discount: "", description: "" }); // Clear form
                }}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {editingId ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;
