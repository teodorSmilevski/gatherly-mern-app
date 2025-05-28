import "./PrimaryButton.css";

const PrimaryButton = ({ onClick, label }) => {
  return (
    <button className="primary-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default PrimaryButton;
