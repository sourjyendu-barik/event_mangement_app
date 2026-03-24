import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { AxiosInstance } from "../../api/AxiosInstance";
import { ENDPOINT } from "../../api/Endpoints";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
const BookingModal = ({ event, onClose }) => {
  const { user } = useAuthContext();
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  // endpoint for create oredrid -> CREATE_ORDER_ID
  //endpoint for verify -> VERIFY_PAYMENT
  const handleBooking = async () => {
    try {
      setLoading(true);
      // 🧾 Step 1: Create order (backend)
      const res = await AxiosInstance.post(
        ENDPOINT.CREATE_ORDER_ID, // createBooking API
        {
          eventId: event._id,
          ticketCount: count,
        },
      );

      const { orderId, amount, bookingId } = res.data;
      // ❗ check Razorpay loaded
      if (!window.Razorpay) {
        toast.error("Payment system not loaded");
        return;
      }
      // 💳 Step 2: Open Razorpay
      const options = {
        key: "rzp_test_SUzQzZqRJwqMQc",
        amount,
        currency: "INR",
        name: "Event Booking",
        description: event.title,
        order_id: orderId,
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        handler: async function (response) {
          try {
            // 🔐 Step 3: Verify payment
            await AxiosInstance.post(ENDPOINT.VERIFY_PAYMENT, {
              ...response,
              bookingId,
            });

            toast.success("Payment Successful 🎉");
            onClose();
          } catch (err) {
            toast.error("Payment verification failed");
          }
        },

        modal: {
          ondismiss: function () {
            toast.error("Payment cancelled ❌");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper onClose={onClose}>
      <h4 className="mb-3">Book Tickets</h4>

      <p>
        <strong>{event.title}</strong>
      </p>

      {/* Ticket Selector */}
      <div className="mb-3">
        <label className="form-label">Number of Tickets</label>
        <input
          type="number"
          min="1"
          max={event.availableTickets}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="form-control"
        />
      </div>

      {/* Price */}
      <p>
        <strong>Total Price:</strong> ₹{count * event.price}
      </p>

      <button
        className="btn btn-success w-100"
        onClick={handleBooking}
        disabled={loading}
      >
        {loading ? "Booking..." : "Pay & Book"}
      </button>
    </ModalWrapper>
  );
};

export default BookingModal;
