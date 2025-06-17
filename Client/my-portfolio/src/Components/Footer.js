import React from "react";
import { Link } from "react-router-dom";

export default function Footer({ disabled }) {
  const handleDisabledClick = (e) => {
    if (disabled) {
      e.preventDefault(); 
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" }); 
    }
  };


  return (
    <footer className="text-center text-lg-start bg-body-tertiary text-muted" style={disabled ? { pointerEvents: 'none', opacity: 0.6 } : {}}>
      {/* Social media */}
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Connect with us on social networks:</span>
        </div>

        <div>
          <a href="https://github.com/danialtrody" onClick={handleDisabledClick} className="me-4 text-reset" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com/in/danialtrody" onClick={handleDisabledClick} className="me-4 text-reset" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="mailto:danialtrody@example.com" onClick={handleDisabledClick} className="me-4 text-reset">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </section>

      {/* Links */}
      <section>
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <p>
              We are Computer Science students and passionate web developers from Haifa, Israel.
              We enjoy learning new technologies and building clean, user-friendly applications together.
            </p>
            <p>
              We believe in continuous growth, teamwork, and solving real-world problems through code — always striving to make the web a better place.
            </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Technologies</h6>
              <p><span className="text-reset">React</span></p>
              <p><span className="text-reset">MongoDB</span></p>
              <p><span className="text-reset">JavaScript</span></p>
              <p><span className="text-reset">CSS/HTML</span></p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Portfolio</h6>
              <p><Link to="/" onClick={handleDisabledClick} className="text-reset">Login</Link></p>
              <p><Link to="/home" onClick={handleDisabledClick} className="text-reset">Home</Link></p>
              <p><Link to="/projects" onClick={handleDisabledClick} className="text-reset">Projects</Link></p>
              <p><Link to="/contact" onClick={handleDisabledClick} className="text-reset">Contact</Link></p>
              <p><Link to="/resume" onClick={handleDisabledClick} className="text-reset">Resume</Link></p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p><i className="fas fa-home me-3"></i> Haifa, Israel</p>
              <p><i className="fas fa-envelope me-3"></i> trody2001@gmail.com</p>
              <p><i className="fas fa-envelope me-3"></i> mhmad.m.ig2001@gmail.com</p>
              <p><i className="fas fa-phone me-3"></i> +972 0545361151</p>
              <p><i className="fas fa-phone me-3"></i> +972 0587797724</p>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
        © {new Date().getFullYear()} Danial Trody - Muhammad Egbaria. All rights reserved.
      </div>
    </footer>
  );
}
