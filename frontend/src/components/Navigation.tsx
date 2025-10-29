import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav>
      <Link
        to="/about"
        className={location.pathname === "/about" ? "active" : ""}
      >
        About Me
      </Link>
      <Link
        to="/experience"
        className={location.pathname === "/experience" ? "active" : ""}
      >
        Experience
      </Link>
      <Link
        to="/projects"
        className={location.pathname === "/projects" ? "active" : ""}
      >
        Projects
      </Link>
      <Link
        to="/contact"
        className={location.pathname === "/contact" ? "active" : ""}
      >
        Contact
      </Link>
    </nav>
  );
};

export default Navigation;
