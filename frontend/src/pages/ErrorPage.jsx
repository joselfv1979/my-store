import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="error-container">
      <h1>Error 404</h1>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default ErrorPage;
