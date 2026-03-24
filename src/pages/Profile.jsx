// // Profile.jsx
// import React from "react";
// import Layout from "../components/LayOut/Layout";
// import { useAuthContext } from "../context/AuthContext";
// import { toast } from "react-toastify";
// const Profile = () => {
//   const { user, logout } = useAuthContext();

//   const handleLogout = async () => {
//     try {
//       await logout();
//       toast.success("User logged out successfullys");
//     } catch (error) {
//       console.log(error);
//       toast.error(error?.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <Layout>
//       <div className="container py-5 text-center">
//         <div
//           className="card shadow-sm p-4 mx-auto"
//           style={{ maxWidth: "400px" }}
//         >
//           <div
//             className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold mx-auto mb-3"
//             style={{ width: "70px", height: "70px", fontSize: "24px" }}
//           >
//             {user.name.charAt(0).toUpperCase()}
//           </div>

//           {/* Username */}
//           <h4 className="mb-3">{user.name}</h4>

//           {/* Logout Button */}
//           <button className="btn btn-danger w-100" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Profile;
import React, { useEffect, useState } from "react";
import Layout from "../components/LayOut/Layout";
import { useAuthContext } from "../context/AuthContext";
import { AxiosInstance } from "../api/AxiosInstance";
import { ENDPOINT } from "../api/Endpoints";
import { toast } from "react-toastify";
import Loader from "../components/reusableComponents/Loader";

const Profile = () => {
  const { user, logout } = useAuthContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await AxiosInstance.get(
          `${ENDPOINT.BOOKINGS}/${user?._id}`,
        );
        setBookings(res.data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);
  console.log("bookings", bookings);
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("User logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed");
  return (
    <Layout>
      <div className="container py-5">
        <div
          className="card shadow-sm p-4 mx-auto mb-5"
          style={{ maxWidth: "400px" }}
        >
          <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold mx-auto mb-3"
            style={{ width: "70px", height: "70px", fontSize: "24px" }}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>

          {/* Username */}
          <h4 className="mb-3">{user.name}</h4>
          <p>
            <strong>Email: </strong>
            {user.email}
          </p>
          <p>
            <strong>Total tikets: </strong>
            {confirmedBookings || 0}
          </p>
          {/* Logout Button */}
          <button className="btn btn-danger w-100" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Bookings Section */}
        <h3 className="mb-3">My Bookings</h3>

        {loading ? (
          <Loader text="Loading your bookings..." />
        ) : confirmedBookings.length === 0 ? (
          <p className="text-muted">You have no bookings yet.</p>
        ) : (
          <div className="row g-3">
            {confirmedBookings.map((booking) => (
              <div key={booking._id} className="col-md-4">
                <div className="card shadow-sm p-3 h-100">
                  <h5 className="card-title">{booking.eventId?.title}</h5>
                  <p className="mb-1">
                    <strong>Tickets:</strong> {booking.ticketCount}
                  </p>
                  <p className="mb-1">
                    <strong>Price per ticket:</strong> ₹{booking.eventId?.price}
                  </p>
                  <p className="mb-1">
                    <strong>Total:</strong> ₹
                    {booking.ticketCount * booking.eventId?.price}
                  </p>
                  <p className="text-muted small mb-0">
                    Booked on: {new Date(booking.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
