import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`mn-navbar ${scrolled ? 'mn-navbar-scrolled' : ''}`}>
      <div className="mn-navbar-inner">
        <Link to="/" className="mn-navbar-logo">
          <img src="/assets/noovosoft-logo-CGcThr_M.svg" alt="Noovosoft" />
        </Link>

        <div className={`mn-navbar-links ${mobileOpen ? 'mn-navbar-links-open' : ''}`}>
          <Link to="/about" className="mn-nav-link" onClick={() => setMobileOpen(false)}>About Us</Link>
          <Link to="/services" className="mn-nav-link" onClick={() => setMobileOpen(false)}>Services</Link>
          <Link to="/casestudy" className="mn-nav-link" onClick={() => setMobileOpen(false)}>Case Studies</Link>
          <Link to="/culture" className="mn-nav-link" onClick={() => setMobileOpen(false)}>Culture</Link>
          <Link to="/career" className="mn-nav-link" onClick={() => setMobileOpen(false)}>Careers</Link>
          <Link to="/contact" className="mn-nav-link" onClick={() => setMobileOpen(false)}>Contact</Link>
        </div>

        <div className="mn-navbar-actions">
          <Link to="/contact" className="mn-nav-cta">
            Get In Touch
          </Link>
        </div>

        <button
          className={`mn-hamburger ${mobileOpen ? 'mn-hamburger-active' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
