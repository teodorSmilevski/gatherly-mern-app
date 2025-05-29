import "../styles/Auth.css";
import illustration from "../assets/images/auth/login-image.svg";
import logo from "/images/gatherly-logo.png";
import GoBackButton from "../components/ui/GoBackButton/GoBackButton";
import { Link } from "react-router-dom";

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    console.log("Login form submitted", { email, password });
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <GoBackButton route="/" />
      </div>

      <div className="login-left">
        <form className="login-form" onSubmit={handleLogin}>
          <img src={logo} alt="Logo" className="login-logo" />
          <h2>Login</h2>
          <p className="login-description">
            Welcome back! Please enter your credentials to continue.
          </p>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </label>
          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>
        <div className="login-register-link">
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>

      <div className="login-right">
        <img src={illustration} alt="Login Illustration" />
      </div>
    </div>
  );
};

export default Login;
