import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ disabled }) {
  const handleDisabledClick = (e) => {
    if (disabled) {
      e.preventDefault();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark" style={disabled ? { pointerEvents: 'none', opacity: 0.6 } : {}}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={handleDisabledClick}>Navbar</Link>

        {/* Navbar Toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Navbar content */}
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleDisabledClick}>Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/home" onClick={handleDisabledClick}>
                Home <span className="visually-hidden">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/projects" onClick={handleDisabledClick}>Projects</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={handleDisabledClick}>Contact</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/resume" onClick={handleDisabledClick}>Resume</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
