import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Projects from "./Pages/Projects";
import Contact from "./Pages/Contact";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Resume from "./Pages/Resume";
import Login from "./Pages/Login";
import News from "./Pages/News";
import CustomerRequests from "./Pages/CustomerRequests";
import "./App.css";
import { useAuth, AuthProvider } from "../src/Components/AuthContext";

function LayoutWrapper() {
  const { isAdmin } = useAuth();
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  const backgroundStyle = {
    background: 'linear-gradient(to right, rgb(155, 214, 238), rgb(202, 146, 228))',
  };

  return (
    <div style={backgroundStyle}>
      <Navbar disabled={isLoginPage} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/news" element={<News />} />
        {isAdmin && (
          <Route path="/admin/customerMessages" element={<CustomerRequests />} />
        )}
      </Routes>
      <Footer disabled={isLoginPage} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <LayoutWrapper />
      </AuthProvider>
    </Router>
  );
}

export default App;
