import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Loading from "../components/reusableComponents/Loading";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthContext();

  if (loading) return <Loading show="Loading....." />;

  if (!user) {
    return <Navigate to="/authPage" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
