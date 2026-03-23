import React from "react";

const TextBtn = ({ onClick, name }) => {
  return (
    <button
      onClick={onClick}
      className="btn btn-link p-0 d-inline"
      style={{ lineHeight: "inherit" }}
    >
      {name}
    </button>
  );
};

export default TextBtn;
