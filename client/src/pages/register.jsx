import "../styles/Auth.css";
import illustration from "../assets/images/auth/register-image.svg";
import logo from "/images/gatherly-logo.png";
import GoBackButton from "../components/ui/GoBackButton/GoBackButton";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from "../utils/validations";

const Register = () => {
  const [selectedRole, setSelectedRole] = useState("user");
  const [errors, setErrors] = useState({});

  const handleRegister = (e) => {
    e.preventDefault();

    const username = e.target.elements.username.value.trim();
    const email = e.target.elements.email.value.trim();
    const password = e.target.elements.password.value;

    const newErrors = {};
    if (!isValidUsername(username))
      newErrors.username = "Username must be at least 3 characters, no spaces.";
    if (!isValidEmail(email)) newErrors.email = "Enter a valid email address.";
    if (!isValidPassword(password))
      newErrors.password = "Password must be at least 8 characters.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    console.log("Register form submitted", {
      username,
      email,
      password,
      role: selectedRole,
    });
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <GoBackButton route="/" />
      </div>

      <div className="login-right">
        <img src={illustration} alt="Register Illustration" />
      </div>

      <div className="login-left">
        <form className="login-form" onSubmit={handleRegister}>
          <img src={logo} alt="Logo" className="login-logo" />
          <h2>Register</h2>

          <label>
            Username
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              required
            />
            <span className="error-message">
              {errors.username && errors.username}
            </span>
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
            <span className="error-message">
              {errors.email && errors.email}
            </span>
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />
            <span className="error-message">
              {errors.password && errors.password}
            </span>
          </label>

          <div className="role-selection">
            <div className="role-chips">
              <span>Select Role:</span>
              <button
                type="button"
                className={`role-chip ${
                  selectedRole === "user" ? "selected" : ""
                }`}
                onClick={() => setSelectedRole("user")}
              >
                User
              </button>
              <button
                type="button"
                className={`role-chip ${
                  selectedRole === "creator" ? "selected" : ""
                }`}
                onClick={() => setSelectedRole("creator")}
              >
                Creator
              </button>
            </div>
          </div>

          <button type="submit" className="auth-btn">
            Register
          </button>
        </form>

        <div className="login-register-link">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
