import "./LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <img
        src="/images/gatherly-logo.png"
        alt="Gatherly Logo"
        className="loading-logo"
      />
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingScreen;
