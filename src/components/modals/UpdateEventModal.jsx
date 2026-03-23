import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import InputComponent from "../reusableFormComponents/InputComponent";
import { AxiosInstance } from "../../api/AxiosInstance";
import { ENDPOINT } from "../../api/Endpoints";
import { toast } from "react-toastify";

const UpdateEventModal = ({ event, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: event?.title || "",
    category: event?.category || "",
    description: event?.description || "",
    date: event?.date ? event.date.substring(0, 10) : "",
    location: event?.location || "",
    price: event?.price || "",
    time: event?.time || "",
    totalTickets: event?.totalTickets || "",
    availableTickets: event?.availableTickets || "",
    image: event?.image || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await AxiosInstance.put(`${ENDPOINT.EVENTS}/${event._id}`, form);

      toast.success("Event updated successfully!");

      if (onSuccess) onSuccess(); // refresh data
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.error || "Update failed");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper onClose={onClose}>
      <h4 className="mb-3">Update Event</h4>

      <form onSubmit={handleSubmit}>
        <InputComponent
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <InputComponent
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
        />

        <InputComponent
          label="Location"
          name="location"
          value={form.location}
          onChange={handleChange}
        />

        <InputComponent
          label="Date"
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />

        <InputComponent
          label="Time"
          name="time"
          value={form.time}
          onChange={handleChange}
        />

        <InputComponent
          label="Price"
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
        />

        <InputComponent
          label="Total Tickets"
          type="number"
          name="totalTickets"
          value={form.totalTickets}
          onChange={handleChange}
        />

        <InputComponent
          label="Available Tickets"
          type="number"
          name="availableTickets"
          value={form.availableTickets}
          onChange={handleChange}
        />

        <InputComponent
          label="Image Url"
          name="image"
          value={form.image}
          onChange={handleChange}
        />

        {/* Description */}
        <div className="mb-3">
          <label className="fw-semibold">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Updating..." : "Update Event"}
        </button>
      </form>
    </ModalWrapper>
  );
};

export default UpdateEventModal;
