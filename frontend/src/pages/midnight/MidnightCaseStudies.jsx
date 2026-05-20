import React from 'react';
import MidnightPageHeader from './MidnightPageHeader';
import MidnightContactForm from './MidnightContactForm';
import { motion } from 'framer-motion';

const caseStudiesData = [
  {
    id: 1,
    title: "Revolutionizing Accounting Practices Through Automation",
    desc: "In the rapidly evolving field of accounting, firms face increasing pressures to manage vast volumes of client data, comply with complex regulations, and meet stringent government submission requirements.",
    image: "/assets/case-studies-1-CuWTBUT7.jpg",
    link: "/casestudy-details-1"
  },
  {
    id: 2,
    title: "Transforming Dairy Farming: The Power of Smart Agri-Tech",
    desc: "An AgriTech company has developed a comprehensive SaaS platform tailored for dairy farms and advisors, addressing key challenges in emissions management, feed optimization, and profitability while adhering to sustainability goals.",
    image: "/assets/case-studies-2-D7Fsg0L0.jpg",
    link: "/casestudy-details-2"
  }
];

const MidnightCaseStudies = () => {
  return (
    <div className="midnight-home">
      <MidnightPageHeader 
        title="Crafting Success Stories Through Digital Innovation" 
        subtitle="Creating solutions that truly connect and deliver impact." 
      />

      <section className="mn-section">
        <div className="mn-container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mn-section-header mn-center"
          >
            <h3 className="mn-subtitle">How Did Noovosoft Help</h3>
            <h2 className="mn-title">A Trusted Partner in Accounting Innovation</h2>
            <p className="mn-desc" style={{ maxWidth: '800px', margin: '0 auto' }}>
              At Noovosoft, our approach combines agility, technical expertise, and a commitment to long-term partnerships. We are dedicated to empowering organizations with high-quality solutions.
            </p>
          </motion.div>

          <div className="mn-grid" style={{ gridTemplateColumns: '1fr 1fr', marginTop: '4rem', gap: '2.5rem' }}>
            {caseStudiesData.map((study, idx) => (
              <motion.a 
                href={study.link}
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="mn-glass-card"
                style={{ textDecoration: 'none', padding: 0, overflow: 'hidden' }}
              >
                <img 
                  src={study.image} 
                  alt={study.title} 
                  style={{ width: '100%', height: 'auto', display: 'block' }} 
                />
                <div style={{ padding: '1.5rem 2rem 2rem' }}>
                  <h3 className="mn-card-title" style={{ fontSize: '1.2rem', marginBottom: '0.75rem', lineHeight: 1.4 }}>{study.title}</h3>
                  <p className="mn-card-desc" style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.95rem' }}>{study.desc}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <MidnightContactForm />
    </div>
  );
};

export default MidnightCaseStudies;
