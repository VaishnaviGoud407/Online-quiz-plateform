import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-primary p-3">
      <Link to="/" className="navbar-brand">
        Quiz Platform
      </Link>
      <div>
        <Link to="/create" className="btn btn-light me-2">
          Create Quiz
        </Link>
        <Link to="/practice" className="btn btn-warning">
          Take Quiz
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
