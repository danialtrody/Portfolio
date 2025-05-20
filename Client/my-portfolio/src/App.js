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
    background: 'linear-gradient(to right, rgb(155, 214, 238), rgb(202, 146, 228))',
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
