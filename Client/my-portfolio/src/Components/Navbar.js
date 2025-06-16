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
