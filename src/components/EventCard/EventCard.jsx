import React from "react";
import { Link } from "react-router-dom";
const EventCard = ({ event }) => {
  const {
    title,
    category,
    image,
    description,
    date,
    location,
    price,
    availableTickets,
  } = event;

  const formattedDate = new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="card h-100 shadow-sm border-0 rounded-4">
      {/* Image */}
      <div className="position-relative">
        <img
          src={image || "https://via.placeholder.com/400x250"}
          className="card-img-top rounded-top-4"
          alt={title}
          style={{ height: "200px", objectFit: "cover" }}
        />

        {/* Category Badge */}
        <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-3">
          {category}
        </span>
      </div>

      {/* Body */}
      <div className="card-body d-flex flex-column">
        {/* Date */}
        <small className="text-muted">{formattedDate}</small>

        {/* Title */}
        <h5 className="fw-bold mt-1">{title}</h5>

        {/* Description */}
        <p className="text-muted small mb-2">{description.slice(0, 80)}...</p>

        {/* Location */}
        <p className="mb-1 small">
          📍 <span className="text-muted">{location}</span>
        </p>

        {/* Tickets */}
        <p className="mb-2 small text-success fw-semibold">
          🎟 {availableTickets} tickets left
        </p>

        {/* Bottom */}
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="fw-bold text-primary fs-5">₹{price}</span>

          <Link
            to={`/events/eventdetails/${event._id}`}
            className="btn btn-dark btn-sm rounded-pill px-3"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
