import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <Header />

      {/* Main Content (pushes footer down) */}
      <main className="container flex-grow-1 py-4">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
