import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const PaymentModal = ({ booking, onClose, onPaymentSuccess }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        <Elements stripe={stripePromise}>
          <CheckoutForm
            booking={booking}
            onClose={onClose} // 🔁 Add this line
            onSuccess={onPaymentSuccess}
          />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentModal;
