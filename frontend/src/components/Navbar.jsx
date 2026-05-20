import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          {/* Logo can be dynamic based on theme if needed */}
          <img src="https://www.noovosoft.com/assets/noovosoft-logo-CGcThr_M.svg" alt="Noovosoft" style={{ height: '30px' }} />
        </Link>

        <div className="nav-links">
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/services" className="nav-link">Services</Link>
          <Link to="/case-studies" className="nav-link">Case Studies</Link>
          <Link to="/culture" className="nav-link">Culture</Link>
          <Link to="/careers" className="nav-link">Careers</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        <div className="nav-actions">
          <button 
            className="theme-toggle-btn" 
            onClick={() => dispatch(toggleTheme())}
          >
            {themeMode === 'modern' ? 'Switch to Legacy UI' : 'Switch to Modern UI'}
          </button>
          
          <Link to="/contact" className="nav-cta">
            Get In Touch
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
