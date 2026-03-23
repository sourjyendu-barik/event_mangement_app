import React, { useState, useEffect } from "react";
import Login from "../components/forms/Login";
import SignIn from "../components/forms/SignIn";
import HeaderName from "../components/reusableComponents/HeaderName";
import { useNavigate } from "react-router-dom";
import Loader from "../components/reusableComponents/Loader";
import { useAuthContext } from "../context/AuthContext";
const AuthPage = () => {
  const [authType, setAuthType] = useState("login");
  const navigate = useNavigate();
  const { user, loading } = useAuthContext;
  //  Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate("/", { replace: true });
    }
  }, [user, loading]);

  //
  if (loading) return <Loader />;
  return (
    <div className="container min-vh-100 d-flex flex-column align-items-center">
      {/* Header */}
      <header className="py-4 text-center">
        <h1 className="fw-bold text-primary">
          <HeaderName />
        </h1>
        <p className="text-muted small mb-0">Manage your events efficiently</p>
      </header>

      {/* Form Card */}
      <main className="w-100 d-flex justify-content-center">
        <div
          className="card shadow-sm border-0 rounded-4 w-100"
          style={{
            maxWidth: "420px",
            background: "linear-gradient(135deg, #edcccc, #bbc4f0)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="card-body p-4">
            {authType === "login" ? (
              <Login authChange={setAuthType} />
            ) : (
              <SignIn authChange={setAuthType} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
