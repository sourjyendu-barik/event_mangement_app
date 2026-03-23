import React from "react";

const Loading = ({ show }) => {
  if (!show) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 vh-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
      style={{ zIndex: 9999 }}
    >
      <div className="text-center">
        <div className="spinner-border text-light" role="status"></div>
        <p className="text-white mt-2">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
