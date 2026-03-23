import { StrictMode } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { createBrowserRouter } from "react-router-dom";
//theme provider
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthContext.jsx";
import { DataProvider } from "./context/DataContext.jsx";

import { ToastContainer } from "react-toastify";
import AuthPage from "./pages/AuthPage.jsx";
import Profile from "./pages/Profile.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import Admin from "./pages/Admin.jsx";
const router = createBrowserRouter([
  { path: "/authPage", element: <AuthPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/", element: <App /> },
      { path: "/profile", element: <Profile /> },
      { path: "/events/eventdetails/:id", element: <EventDetails /> },
      { path: "/admin", element: <Admin /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <DataProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer position="top-center" autoClose={3000} />
      </DataProvider>
    </AuthProvider>
  </StrictMode>,
);
