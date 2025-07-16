import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import Swal from "sweetalert2";

const CheckoutForm = ({ booking, onClose, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [processing, setProcessing] = useState(false);

  const totalPrice = booking.slots.length * booking.price;
  const finalPrice = Math.max(0, totalPrice - discount); // No negative price

  // ✅ Load coupons from backend
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await axios.get("http://localhost:5000/coupons");
        setAvailableCoupons(res.data);
      } catch (err) {
        console.error("Failed to load coupons", err);
      }
    };

    fetchCoupons();
  }, []);

  const handleApplyCoupon = async () => {
    if (appliedCoupon) {
      return Swal.fire(
        "Already Applied",
        "You’ve already used a coupon.",
        "info"
      );
    }

    if (!couponCode) {
      return Swal.fire("Empty Code", "Please enter a coupon code.", "warning");
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/coupons?code=${couponCode.trim().toUpperCase()}`
      );
      const coupon = res.data;

      if (!coupon) {
        return Swal.fire("Invalid", "Coupon code not found", "error");
      }

      let calculatedDiscount = 0;
      const totalPrice = booking.slots.length * booking.price;

      if (coupon.type === "percent") {
        calculatedDiscount = (totalPrice * coupon.value) / 100;
      } else if (coupon.type === "amount") {
        calculatedDiscount = coupon.value;
      }

      setDiscount(calculatedDiscount);
      setAppliedCoupon(true);

      Swal.fire(
        "Success",
        `Coupon applied: ৳${Math.round(calculatedDiscount)} off`,
        "success"
      );
    } catch (err) {
      console.error("Error applying coupon:", err);
      Swal.fire("Error", "Failed to apply coupon", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/create-payment-intent",
        {
          amount: finalPrice,
        }
      );

      const { clientSecret } = res.data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.paymentIntent?.status === "succeeded") {
        const transactionId = result.paymentIntent.id;

        // Save payment record
        const paymentInfo = {
          bookingId: booking._id,
          userEmail: booking.userEmail,
          amount: finalPrice,
          transactionId,
          discount,
          couponUsed: appliedCoupon ? couponCode : null,
          date: new Date(),
          status: "Paid",
        };

        await axios.post("http://localhost:5000/payments", paymentInfo);

        // Update booking status
        await axios.patch(
          `http://localhost:5000/bookings/payment/${booking._id}`,
          { paymentStatus: "paid" }
        );

        Swal.fire("✅ Success", "Payment completed successfully", "success");
        if (onClose) onClose();
        if (onPaymentSuccess) onPaymentSuccess();
        else window.location.reload();
      } else {
        Swal.fire("Payment Failed", "Transaction did not succeed", "error");
      }
    } catch (err) {
      console.error("Payment error:", err);
      Swal.fire("Error", "Something went wrong during payment", "error");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 rounded-md shadow-md bg-white w-full max-w-md mx-auto"
    >
      <h3 className="text-xl font-semibold text-center mb-2">
        Confirm Payment
      </h3>

      {/* Coupon Field */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter coupon code"
          className="input input-bordered w-full"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          disabled={appliedCoupon}
        />
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleApplyCoupon}
          disabled={appliedCoupon}
        >
          Apply
        </button>
      </div>

      {/* Readonly Details */}
      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <strong>Email:</strong> {booking.userEmail}
        </p>
        <p>
          <strong>Court:</strong> {booking.courtType}
        </p>
        <p>
          <strong>Slots:</strong> {booking.slots.join(", ")}
        </p>
        <p>
          <strong>Date:</strong> {booking.date}
        </p>
        <p>
          <strong>Price:</strong>{" "}
          <span className="text-green-600 font-bold">
            ৳{finalPrice}
            {discount > 0 && (
              <span className="line-through text-gray-400 ml-2">
                ৳{totalPrice}
              </span>
            )}
          </span>
        </p>
      </div>

      {/* Stripe Card Input */}
      <div className="p-2 border rounded-md">
        <CardElement />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={!stripe || processing}
      >
        {processing ? "Processing..." : `Pay ৳${finalPrice}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
