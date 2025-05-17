import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Projects from './Pages/Projects';
import Contact from './Pages/Contact';


function App() {
  return (

    <BrowserRouter>
          <Routes>      
            <Route path="/" element={<Home />} /> 
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
    </BrowserRouter>
    
  );
}

export default App;
