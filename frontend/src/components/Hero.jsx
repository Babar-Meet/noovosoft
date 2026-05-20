import { Canvas } from '@react-three/fiber';
import ThreeScene from './ThreeScene';
import './Hero.css';

const Hero = () => {
  const stats = [
    { value: '100+', label: 'Projects Delivered' },
    { value: '50+', label: 'Global Clients' },
    { value: '20+', label: 'Team Members' },
    { value: '5+', label: 'Years Experience' },
  ];

  return (
    <section id="home" className="hero">
      <div className="hero-bg-grid"></div>
      <div className="hero-glow-1"></div>
      <div className="hero-glow-2"></div>
      
      <div className="hero-3d-container">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <ThreeScene />
        </Canvas>
      </div>

      <div className="hero-content">
        <h1 className="hero-title">
          <span className="title-line title-white">Your Vision, Perfected</span>
          <span className="title-line title-gradient">with Our Software Craftsmanship</span>
        </h1>
        
        <p className="hero-description">
          Delivering digital innovations that elevate business value for our clients.
          We empower companies to move faster without compromising quality or security.
        </p>
        
        <div className="hero-buttons">
          <button className="btn-primary" data-hover>
            <span>Talk To Our Experts</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
          <button className="btn-secondary" data-hover>
            <span>View Case Studies</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <div className="hero-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item" style={{ animationDelay: `${index * 0.15}s` }}>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;
