import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import InputComponent from "../reusableFormComponents/InputComponent";
import { AxiosInstance } from "../../api/AxiosInstance";
import { ENDPOINT } from "../../api/Endpoints";
import { toast } from "react-toastify";

const AddEventModal = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    date: "",
    location: "",
    price: "",
    time: "",
    totalTickets: "",
    availableTickets: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await AxiosInstance.post(ENDPOINT.EVENTS, form);
      toast.success("Booking successful!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper onClose={onClose}>
      <h4 className="mb-3">Add Event</h4>

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
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
        />
        {/* Description (textarea custom) */}
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

        <button className="btn btn-success w-100">Create Event</button>
      </form>
    </ModalWrapper>
  );
};

export default AddEventModal;
