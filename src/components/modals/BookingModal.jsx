import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { AxiosInstance } from "../../api/AxiosInstance";
import { ENDPOINT } from "../../api/Endpoints";
import { toast } from "react-toastify";

const BookingModal = ({ event, onClose }) => {
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    try {
      setLoading(true);

      await AxiosInstance.post(ENDPOINT.BOOKINGS, {
        eventId: event._id,
        ticketCount: count,
      });

      toast.success("Booking successful!");
      onClose();
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
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
    </ModalWrapper>
  );
};

export default BookingModal;
