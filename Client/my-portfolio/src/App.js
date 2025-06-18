import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Projects from "./Pages/Projects";
import Contact from "./Pages/Contact";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Resume from "./Pages/Resume";
import Login from "./Pages/Login";
import News from "./Pages/News"
import "./App.css";
import { AuthProvider } from "../src/Components/AuthContext";

function LayoutWrapper() {
  const location = useLocation();
  // Determine if the current page is the login page ("/")
  const isLoginPage = location.pathname === "/";

  const backgroundStyle = {
    background: 'linear-gradient(to right, rgb(155, 214, 238), rgb(202, 146, 228))',
  };

  return (
    <div style={backgroundStyle}>
      {/* Navbar component, disable it on login page */}
      <Navbar disabled={isLoginPage} />
      {/* Provide authentication context to child components */}
      <AuthProvider>
        {/* Define routes for different pages */}
        <Routes>
          <Route path="/" element={<Login />} />          {/* Login page */}
          <Route path="/home" element={<Home />} />        {/* Home page */}
          <Route path="/projects" element={<Projects />} />{/* Projects page */}
          <Route path="/contact" element={<Contact />} />  {/* Contact page */}
          <Route path="/resume" element={<Resume />} />    {/* Resume page */}
          <Route path="/news" element={<News />} />    {/* News page */}
        </Routes>
      </AuthProvider>
      {/* Footer component, disable it on login page */}
      <Footer disabled={isLoginPage} />
    </div>
  );
}

// Main App component which wraps LayoutWrapper inside Router for routing support
function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;
