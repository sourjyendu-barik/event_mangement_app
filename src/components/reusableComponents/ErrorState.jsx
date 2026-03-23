import React from "react";

export default function ErrorState({
  message = "Something went wrong",
  onRetry = null,
}) {
  return (
    <div className="text-center py-5">
      <div className="mb-3 fs-1">⚠️</div>

      <h4 className="fw-semibold">Error</h4>
      <p className="text-muted">{message}</p>

      {onRetry && (
        <button className="btn btn-primary mt-3" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}
