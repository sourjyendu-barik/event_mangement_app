// Footer.jsx
import React from "react";
import HeaderName from "../reusableComponents/HeaderName";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <p className="mb-0">
        &copy; <HeaderName />
      </p>
    </footer>
  );
};

export default Footer;
