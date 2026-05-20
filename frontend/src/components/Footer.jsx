import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mn-footer">
      <div className="mn-footer-inner">
        {/* Development Centers */}
        <div className="mn-footer-top">
          <h3 className="mn-footer-heading">Our Development Center</h3>
          <div className="mn-footer-locations">
            <div className="mn-footer-location">
              <h4>Pune, India</h4>
              <p>5th Floor, Ideas to Impacts, Lane Number 3, Pallod Farms Baner Road<br />Pune, Maharashtra 411045</p>
            </div>
            <div className="mn-footer-location">
              <h4>Rajkot, India</h4>
              <p>404 – Corporate Levels, Ayodhya Chowk, 150 Feet Ring Road<br />Rajkot, Gujarat 360007</p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mn-footer-contacts">
          <div className="mn-footer-contact">
            <span className="mn-footer-label">NEW BUSINESS</span>
            <a href="mailto:sales@noovosoft.com">sales@noovosoft.com</a>
          </div>
          <div className="mn-footer-contact">
            <span className="mn-footer-label">CONTACT</span>
            <a href="mailto:contact@noovosoft.com">contact@noovosoft.com</a>
          </div>
          <div className="mn-footer-contact">
            <span className="mn-footer-label">CAREERS</span>
            <a href="mailto:careers@noovosoft.com">careers@noovosoft.com</a>
          </div>
        </div>

        {/* Links */}
        <div className="mn-footer-links">
          <Link to="/about">About Us</Link>
          <Link to="/services">Services</Link>
          <Link to="/casestudy">Case Studies</Link>
          <Link to="/culture">Culture</Link>
          <Link to="/career">Careers</Link>
        </div>

        {/* Copyright */}
        <div className="mn-footer-copy">
          <p>&copy; Copyright Noovosoft 2026 | <Link to="/privacy">Terms &amp; Conditions • Privacy Policy</Link></p>
        </div>
      </div>

      <style>{`
        .mn-footer {
          background: linear-gradient(180deg, rgba(6,6,11,1) 0%, rgba(10,8,20,1) 100%);
          border-top: 1px solid rgba(139,92,246,0.08);
          padding: 4rem 0 2rem;
          font-family: 'Inter', sans-serif;
          color: rgba(255,255,255,0.6);
        }
        .mn-footer-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        .mn-footer-top {
          text-align: center;
          margin-bottom: 3rem;
        }
        .mn-footer-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.2rem;
          font-weight: 600;
          color: rgba(255,255,255,0.85);
          margin-bottom: 2rem;
        }
        .mn-footer-locations {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          max-width: 800px;
          margin: 0 auto;
        }
        .mn-footer-location h4 {
          color: #c4b5fd;
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .mn-footer-location p {
          font-size: 0.88rem;
          line-height: 1.6;
        }
        .mn-footer-contacts {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          padding: 2rem 0;
          border-top: 1px solid rgba(139,92,246,0.06);
          border-bottom: 1px solid rgba(139,92,246,0.06);
          margin-bottom: 2rem;
        }
        .mn-footer-contact {
          text-align: center;
        }
        .mn-footer-label {
          display: block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 0.5rem;
        }
        .mn-footer-contact a {
          color: #a78bfa;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }
        .mn-footer-contact a:hover {
          color: #c4b5fd;
        }
        .mn-footer-links {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }
        .mn-footer-links a {
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        .mn-footer-links a:hover {
          color: #c4b5fd;
        }
        .mn-footer-copy {
          text-align: center;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(139,92,246,0.06);
        }
        .mn-footer-copy p {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.3);
        }
        .mn-footer-copy a {
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .mn-footer-copy a:hover {
          color: #a78bfa;
        }
        @media (max-width: 768px) {
          .mn-footer-locations { grid-template-columns: 1fr; }
          .mn-footer-contacts { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
