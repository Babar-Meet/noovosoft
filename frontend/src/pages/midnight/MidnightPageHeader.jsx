import React from 'react';
import { motion } from 'framer-motion';
import './MidnightHome.css'; // Reusing styles

const MidnightPageHeader = ({ title, subtitle, buttonText, buttonLink }) => {
  return (
    <section className="mn-section" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="mn-container mn-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="mn-title" style={{ fontSize: '4rem', marginBottom: '1.5rem', whiteSpace: 'pre-line' }} dangerouslySetInnerHTML={{ __html: title }} />
          {subtitle && <p className="mn-desc" style={{ fontSize: '1.25rem', whiteSpace: 'pre-line' }} dangerouslySetInnerHTML={{ __html: subtitle }} /> }
          {buttonText && buttonLink && (
            <a href={buttonLink} className="mn-btn-primary" style={{ marginTop: '2rem', display: 'inline-flex' }}>
              <span>{buttonText}</span>
              <span className="mn-arrow">→</span>
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default MidnightPageHeader;
