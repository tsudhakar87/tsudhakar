import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

// Import your pages
import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
// import Resume from './pages/Resume';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        {/* Uncomment as you create these pages:
        <Route path="/resume" element={<Resume />} />
        */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
