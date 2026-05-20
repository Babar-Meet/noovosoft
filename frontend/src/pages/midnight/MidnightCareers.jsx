import React from 'react';
import MidnightPageHeader from './MidnightPageHeader';
import MidnightContactForm from './MidnightContactForm';
import { motion } from 'framer-motion';

const openPositions = [
  { id: 1, title: 'Java Developer', type: 'Hybrid', time: 'Full Time', link: '/career-details/1' },
  { id: 2, title: 'React Developer', type: 'Hybrid', time: 'Full Time', link: '/career-details/2' },
  { id: 3, title: 'Full Stack Python Developer', type: 'Hybrid', time: 'Full Time', link: '/career-details/3' }
];

const MidnightCareers = () => {
  return (
    <div className="midnight-home">
      <MidnightPageHeader 
        title="Join Our Team, Shape the Future" 
        subtitle="Be part of a dynamic team where innovation, collaboration, and growth drive success." 
      />

      <section className="mn-section mn-glass-bg">
        <div className="mn-container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mn-section-header mn-center"
          >
            <h3 className="mn-subtitle">Careers</h3>
            <h2 className="mn-title">Open positions</h2>
            <p className="mn-desc" style={{ maxWidth: '800px', margin: '0 auto' }}>
              Be part of a dynamic team where innovation, collaboration, and growth drive success.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '4rem', maxWidth: '900px', margin: '4rem auto 0' }}>
            {openPositions.map((job, idx) => (
              <motion.div 
                key={job.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="mn-glass-card mn-hover-float"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', padding: '2rem' }}
              >
                <div>
                  <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '0.75rem' }}>{job.title}</h3>
                  <div style={{ display: 'flex', gap: '1.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      {job.type}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                      {job.time}
                    </span>
                  </div>
                </div>
                <a 
                  href={job.link}
                  className="mn-btn-outline"
                  style={{ padding: '0.75rem 1.5rem' }}
                >
                  More Details <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <MidnightContactForm />
    </div>
  );
};

export default MidnightCareers;
