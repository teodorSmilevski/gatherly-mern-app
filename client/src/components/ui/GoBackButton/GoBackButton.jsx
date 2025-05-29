import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "./GoBackButton.css";
const GoBackButton = ({ route = -1 }) => {
  const navigate = useNavigate();

  return (
    <button className="go-back-btn" onClick={() => navigate(route)}>
      <IoIosArrowBack />
      Go back
    </button>
  );
};

export default GoBackButton;
