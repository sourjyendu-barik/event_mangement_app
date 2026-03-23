import React, { useEffect } from "react";

const ModalWrapper = ({ children, onClose }) => {
  // ✅ Disable background scroll + ESC close
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div
      className="modal show fade"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClose} // ✅ backdrop click closes
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()} // ✅ prevent close inside
      >
        <div className="modal-content p-4 position-relative">
          {/* Close Button */}
          <button
            className="btn-close position-absolute top-0 end-0 m-3"
            onClick={onClose}
          ></button>

          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
