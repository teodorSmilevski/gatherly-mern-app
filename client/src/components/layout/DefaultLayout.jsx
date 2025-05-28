import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./DefaultLayout.css";
import { useAuth } from "../../hooks/useAuth";

const DefaultLayout = () => {
  const { isAuth: isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="navbar">
        <div className="navbar-logo">
          <img src="/images/gatherly-logo.png" alt="Gatherly Logo" />
        </div>
        <nav className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          {isAuthenticated ? (
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          )}
        </nav>
        <div
          className="navbar-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </div>
      </header>

      <main className="layout-content">
        <Outlet />
      </main>
      <footer className="footer">
        <img
          src="/images/gatherly-logo-white.png"
          alt="Gatherly Logo"
          className="footer-logo"
        />
      </footer>
    </>
  );
};

export default DefaultLayout;
