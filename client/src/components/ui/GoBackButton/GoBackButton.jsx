import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "./GoBackButton.css";
const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <button className="go-back-btn" onClick={() => navigate(-1)}>
      <IoIosArrowBack />
      Go back
    </button>
  );
};

export default GoBackButton;
