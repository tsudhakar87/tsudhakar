import React from "react";
import { Link } from "react-router-dom";

const HomeButton: React.FC = () => {
  return (
    <Link to="/" className="button">
      Home
    </Link>
  );
};

export default HomeButton;
