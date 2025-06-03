import "./LoadingScreen.css";
import Spinner from "./Spinner";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <img
        src="/images/gatherly-logo.png"
        alt="Gatherly Logo"
        className="loading-logo"
      />
      <Spinner />
    </div>
  );
};

export default LoadingScreen;
