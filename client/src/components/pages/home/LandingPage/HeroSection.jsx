// components/HeroSection.jsx
import image from "../../../../assets/images/home/hero-image.svg";
import "./HeroSection.css";
import PrimaryButton from "../../../ui/PrimaryButton/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";

const HeroSection = () => {
  const { isAuth, user } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (isAuth && user.role === "creator") {
      return navigate("/events/new");
    }

    navigate("/login");
  };

  const label =
    isAuth && user.role === "creator" ? "Create Event" : "Get Started";

  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Create & Share Stunning Events</h1>
        <p>
          Host memorable virtual or in-person gatherings with ease. Gatherly
          helps you manage, promote, and grow your events.
        </p>
        {!isAuth ||
          (user.role === "creator" && (
            <PrimaryButton label={label} onClick={handleNavigate} />
          ))}
      </div>
      <div className="hero-image">
        <img src={image} alt="Hero Illustration" />
      </div>
    </section>
  );
};

export default HeroSection;
