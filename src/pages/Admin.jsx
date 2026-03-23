import React, { useState } from "react";
import { useDataContext } from "../context/DataContext";
import Layout from "../components/LayOut/Layout";
import Loader from "../components/reusableComponents/Loader";
import ErrorState from "../components/reusableComponents/ErrorState";
import AddEventModal from "../components/modals/AddEventModal";
import AdminEventcard from "../components/EventCard/AdminEventcard";
const Admin = () => {
  const [showModal, setShowModal] = useState(false);
  const { events } = useDataContext();
  const { data, loading, error } = events;
  if (loading) {
    return <Loader text="Events data are loading...." />;
  }
  if (error) {
    return <ErrorState />;
  }
  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>All Events</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Add Event
        </button>
      </div>
      <section>
        <div className="row">
          {data.map((e, i) => {
            return (
              <div className="col-md-3 mb-3" key={`EventCardAdmin${i}`}>
                {/* <div className="card">
                  <div className="card-body">
                    <h5>{e?.title}</h5>
                    <p>
                      <strong>Created By :</strong> {e?.organizerId?.name}
                    </p>
                    <p>
                      <strong>Location :</strong>
                      {e?.location}
                    </p>
                  </div>
                </div> */}
                <AdminEventcard e={e} />
              </div>
            );
          })}
        </div>
      </section>
      {showModal && <AddEventModal onClose={() => setShowModal(false)} />}
    </Layout>
  );
};

export default Admin;
