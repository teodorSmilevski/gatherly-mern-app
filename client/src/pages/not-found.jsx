import { Link, useNavigate } from "react-router-dom";
import "../styles/NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  const navigateBack = () => {
    console.log("Navigating back to the previous page");

    navigate(-1);
  };

  return (
    <div className="notfound-container">
      <img
        src="/images/gatherly-logo.png"
        alt="Gatherly Logo"
        className="notfound-logo"
      />
      <h1 className="notfound-title">404 - Page Not Found</h1>
      <p className="notfound-text">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button className="notfound-button" onClick={navigateBack}>
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
