import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Projects from "./Pages/Projects";
import Contact from "./Pages/Contact";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Resume from "./Pages/Resume"
import ".//App.css"


function App() {

  const backgroundStyle = {
    backgroundImage: `url('/background.avif')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',


  };

  return (
    <Router>
      <div style={backgroundStyle} >
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
