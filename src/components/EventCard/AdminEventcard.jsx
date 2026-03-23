import React, { useState } from "react";
import UpdateEventModal from "../modals/UpdateEventModal";
import { AxiosInstance } from "../../api/AxiosInstance";
import { ENDPOINT } from "../../api/Endpoints";
import { toast } from "react-toastify";

const AdminEventcard = ({ e }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      await AxiosInstance.delete(`${ENDPOINT.EVENTS}/${e._id}`);
      toast.success("Event deleted");
    } catch (error) {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="card shadow-sm mb-3 border-0">
        <div className="card-body">
          <h5 className="card-title fw-bold">{e?.title}</h5>

          <p className="card-text text-muted mb-1">
            <strong>Created By:</strong> {e?.organizerId?.name}
          </p>

          <p className="card-text text-muted">
            <strong>Location:</strong> {e?.location}
          </p>

          <div className="d-flex gap-2 mt-3">
            <button
              className="btn btn-danger btn-sm"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete Event"}
            </button>

            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setShowUpdateModal(true)}
            >
              Update Event
            </button>
          </div>
        </div>
      </div>

      {showUpdateModal && (
        <UpdateEventModal event={e} onClose={() => setShowUpdateModal(false)} />
      )}
    </>
  );
};

export default AdminEventcard;
