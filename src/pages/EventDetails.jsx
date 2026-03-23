import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/LayOut/Layout";
import { AxiosInstance } from "../api/AxiosInstance";
import { ENDPOINT } from "../api/Endpoints";
import Loader from "../components/reusableComponents/Loader";
import ErrorState from "../components/reusableComponents/ErrorState";
import { useState, useEffect } from "react";
import BookingModal from "../components/modals/BookingModal";
const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await AxiosInstance.get(`${ENDPOINT.EVENTS}/${id}`);
        setEvent(res?.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);
  if (loading) {
    return <Loader text="Event details is loading" />;
  }
  if (error) {
    return <ErrorState />;
  }
  //console.log(event);
  return (
    <Layout>
      <div className="card shadow-lg">
        {/* Image */}
        <img
          src={event.image}
          className="card-img-top"
          alt={event.title}
          style={{ height: "400px", objectFit: "cover" }}
        />

        <div className="card-body">
          {/* Title & Category */}
          <h2 className="card-title">{event.title}</h2>
          <span className="badge bg-primary mb-3">{event.category}</span>

          {/* Date & Location */}
          <p className="mb-1">
            <strong>Date:</strong> {new Date(event.date).toLocaleString()}
          </p>
          <p>
            <strong>Location:</strong> {event.location}
          </p>
          <p>
            <strong>Time:</strong> {event.time}
          </p>
          {/* Description */}
          <p className="mt-3">{event.description}</p>

          {/* Ticket Info */}
          <div className="row my-3">
            <div className="col-md-4">
              <div className="p-3 bg-light rounded">
                <strong>Price:</strong> ₹{event.price}
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 bg-light rounded">
                <strong>Available:</strong> {event.availableTickets}
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 bg-light rounded">
                <strong>Total:</strong> {event.totalTickets}
              </div>
            </div>
          </div>

          {/* Organizer */}
          <div className="border-top pt-3">
            <h5>Organizer</h5>
            <p className="mb-1">
              <strong>Name:</strong> {event.organizerId.name}
            </p>
            <p>
              <strong>Email:</strong> {event.organizerId.email}
            </p>
          </div>

          {/* Button */}
          <button
            className="btn btn-success mt-3 w-100"
            disabled={event.availableTickets === 0}
            onClick={() => setShowModal(true)}
          >
            {event.availableTickets === 0 ? "Sold Out" : "Book Now"}
          </button>
        </div>
      </div>
      {showModal && (
        <BookingModal event={event} onClose={() => setShowModal(false)} />
      )}
    </Layout>
  );
};

export default EventDetails;
