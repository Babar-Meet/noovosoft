import React from 'react';
import MidnightPageHeader from './MidnightPageHeader';
import MidnightContactForm from './MidnightContactForm';
import { motion } from 'framer-motion';

const valuesData = [
  { title: "Integrity and Trust", desc: "We prioritize honesty and transparency in every interaction, building a foundation of trust that strengthens our relationships." },
  { title: "Cooperation and Diversity", desc: "Our collaborative environment thrives on diverse perspectives, fostering innovation and driving success through collective effort." },
  { title: "Growth and Drive", desc: "We are committed to personal and professional growth, encouraging our team to pursue excellence with passion and determination." },
  { title: "Work-Life Balance", desc: "We value a balanced approach to work and life, ensuring our team can maintain both productivity and well-being." },
  { title: "Commitment to Excellence", desc: "Driven by a shared commitment to quality, we continuously strive to exceed expectations and deliver outstanding results." }
];

const galleryImages = [
  "/assets/1-D8f5e6Ab.jpg",
  "/assets/2-6Q72EnKX.jpg",
  "/assets/3-DxuJMXzc.jpg",
  "/assets/4-DJ0z4lME.jpg",
  "/assets/5-65NzZ12t.jpg",
  "/assets/6-B61hI1pR.jpg",
  "/assets/7-D_F0VgD4.jpg"
];

const MidnightCulture = () => {
  return (
    <div className="midnight-home">
      <MidnightPageHeader 
        title="Innovate, Adapt, Excel" 
        subtitle="At Noovosoft, we thrive on pushing boundaries, embracing change <br/> and crafting digital solutions that drive progress in a dynamic world." 
        buttonText="Connect with us"
        buttonLink="/contact"
      />

      <section className="mn-section">
        <div className="mn-container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mn-section-header mn-center"
          >
            <h3 className="mn-subtitle">Exploring Diversity and Innovation</h3>
            <h2 className="mn-title" style={{ fontSize: '2rem' }}>We don’t just build software—we engineer success.</h2>
          </motion.div>

          {/* Row 1: matching original col-2, col-4, col-4, col-2 layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 2fr 1fr', gap: '1rem', marginTop: '3rem' }}>
            {galleryImages.slice(0, 4).map((src, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                style={{ borderRadius: '16px', overflow: 'hidden', height: '250px' }}
                className="mn-glass-card mn-hover-float"
              >
                <img 
                  src={src} 
                  alt={`Culture ${idx + 1}`} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.85 }} 
                />
              </motion.div>
            ))}
          </div>
          {/* Row 2: matching original 3 equal columns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            {galleryImages.slice(4, 7).map((src, idx) => (
              <motion.div
                key={idx + 4}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (idx + 4) * 0.1 }}
                style={{ borderRadius: '16px', overflow: 'hidden', height: '250px' }}
                className="mn-glass-card mn-hover-float"
              >
                <img 
                  src={src} 
                  alt={`Culture ${idx + 5}`} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.85 }} 
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mn-section mn-glass-bg">
        <div className="mn-container">
          <div className="mn-grid" style={{ gridTemplateColumns: '1fr 2fr', gap: '4rem' }}>
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mn-title" style={{ fontSize: '2.25rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>Our Culture values and beliefs.</h2>
              <p className="mn-desc" style={{ marginBottom: '2rem' }}>
                Our foundation is built on innovation, integrity, and collaboration. We stay ahead of the curve, ensuring our clients benefit from the latest advancements in technology.
              </p>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '1.05rem' }}>
                Our culture is key to our success, focusing on excellence and innovation. We create a supportive work environment by:
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {valuesData.map((item, idx) => (
                  <div key={idx} className="mn-glass-card" style={{ padding: '1.75rem', background: 'rgba(255, 255, 255, 0.03)' }}>
                    <h4 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                      {item.title}
                    </h4>
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0, fontSize: '1rem', lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mn-section">
        <div className="mn-container mn-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mn-glass-card"
            style={{ 
              background: 'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(6,6,11,0.8) 100%)',
              padding: '4rem 2rem',
              maxWidth: '900px',
              margin: '0 auto',
              borderTop: '2px solid rgba(139,92,246,0.4)'
            }}
          >
            <h2 className="mn-title" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>The Team That Powers Innovation</h2>
            <p className="mn-desc" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
              Our team is a diverse mix of creative minds, problem solvers, and tech enthusiasts who share a passion for delivering exceptional results. With a culture of continuous learning, collaboration, and an eye on the future, we are committed to making a lasting impact—one project at a time.
            </p>
          </motion.div>
        </div>
      </section>

      <MidnightContactForm />
    </div>
  );
};

export default MidnightCulture;
