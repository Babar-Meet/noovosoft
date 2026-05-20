import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useCallback } from 'react';

// Original CSS (cloned exactly)
import './noovosoft.css';

// Modern Global CSS
import './components/CustomCursor.css';
import './components/Navbar.css';

// Components
import ThemeToggle from './components/ThemeToggle';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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

// Admin
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

// ---------------------------------------------------------------------------
// Inner component that has access to useNavigate (must be inside <Router>)
// ---------------------------------------------------------------------------
function AppContent() {
  const themeMode = useSelector((state) => state.theme.mode);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/login') || location.pathname.startsWith('/admin');

  // ---- Apply theme class to body ----
  useEffect(() => {
    document.body.className = `theme-${themeMode}`;
  }, [themeMode]);

  // ---- Intercept <a href> clicks inside legacy HTML so they use React Router
  //      instead of causing full page reloads ----
  const handleLegacyClicks = useCallback((e) => {
    // Only intercept left-clicks without modifier keys
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const anchor = e.target.closest('a[href]');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href) return;

    // Only intercept internal links (starting with /)
    if (href.startsWith('/') && !href.startsWith('//')) {
      // Skip mailto: and tel: style links disguised in href
      if (href.startsWith('/assets') || href.startsWith('/static')) return;
      e.preventDefault();
      navigate(href);
      window.scrollTo(0, 0);
    }
  }, [navigate]);

  // ---- Intercept <form> submissions inside legacy HTML ----
  const handleLegacyForms = useCallback(async (e) => {
    const form = e.target.closest('form');
    if (!form) return;

    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Determine endpoint based on form fields or page
    let endpoint = '';
    if (data.message) {
      endpoint = '/contact';
    } else if (data.coverLetter || location.pathname.includes('career')) {
      endpoint = '/career/apply';
    } else {
      // fallback or ignore
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      if (response.ok) {
        alert(result.message || 'Submitted successfully!');
        form.reset();
      } else {
        alert(result.error || 'Failed to submit form.');
      }
    } catch (err) {
      alert('An error occurred. Please try again.');
    }
  }, [location.pathname]);

  useEffect(() => {
    document.addEventListener('click', handleLegacyClicks);
    document.addEventListener('submit', handleLegacyForms);
    return () => {
      document.removeEventListener('click', handleLegacyClicks);
      document.removeEventListener('submit', handleLegacyForms);
    };
  }, [handleLegacyClicks, handleLegacyForms]);

  // ---- Scroll to top on route change ----
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`app-container ${themeMode}`}>
      <CustomCursor />
      {!isAdminRoute && themeMode === 'midnight' && <Navbar />}
      {!isAdminRoute && <ThemeToggle />}

      <Routes>
        {/* Admin Routes */}
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Public Routes */}
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

      {!isAdminRoute && themeMode === 'midnight' && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
