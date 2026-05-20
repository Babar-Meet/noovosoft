import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

// Original CSS (cloned exactly)
import './noovosoft.css';

// Pages (These now contain their own header/footer and content from scraping)
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import CaseStudies from './pages/CaseStudies';
import Culture from './pages/Culture';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import CasestudyDetails1 from './pages/CasestudyDetails1';
import CasestudyDetails2 from './pages/CasestudyDetails2';

function App() {
  // We keep the theme state available so we can switch back to the modern/space theme later
  const themeMode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    // We add the theme class to body. 
    // The legacy theme is now the 100% clone of the original site (white/blue).
    // The modern theme will be the dark space theme.
    document.body.className = `theme-${themeMode}`;
  }, [themeMode]);

  return (
    <Router>
      <div className={`app-container ${themeMode}`}>
        {/* We removed the custom Navbar and Footer here because the scraped pages 
            already include them natively, ensuring a 100% perfect visual clone. */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/casestudy" element={<CaseStudies />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/casestudy-details-1" element={<CasestudyDetails1 />} />
          <Route path="/casestudy-details-2" element={<CasestudyDetails2 />} />
          <Route path="/culture" element={<Culture />} />
          <Route path="/career" element={<Careers />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
