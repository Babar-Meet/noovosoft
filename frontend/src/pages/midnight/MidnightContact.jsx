import React from 'react';
import MidnightPageHeader from './MidnightPageHeader';
import MidnightContactForm from './MidnightContactForm';
import { motion } from 'framer-motion';

const locations = [
  {
    city: 'Pune, India',
    address: '5th Floor, Ideas to Impacts, Lane Number 3, Pallod Farms Baner Road, Pune, Maharashtra 411045',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.380257957629!2d73.79479817393673!3d18.556887668066384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfd814bea61d%3A0x1522a31767464c68!2sAlacrity%20India%20Innovation%20Centre!5e0!3m2!1sen!2sin!4v1736187160574!5m2!1sen!2sin',
    directionUrl: 'https://www.google.com/maps/dir//Alacrity+India+Innovation+Centre+Ideas+to+Impacts,+Lane+3+Near+VIJAY+SALES+-+BANER,+Pallod+Farms,+Baner+Pune,+Maharashtra+411045/@18.5568826,73.7973731,16z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bc2bfd814bea61d:0x1522a31767464c68!2m2!1d73.7973731!2d18.5568826?entry=ttu&g_ep=EgoyMDI1MDMxMC4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    city: 'Rajkot, India',
    address: '404 \u2013 Corporate Levels, Ayodhya Chowk, 150 Feet Ring Road, Rajkot, Gujarat 360007',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.8861732367673!2d70.76741847618685!3d22.320144229672326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c9a1cd664643%3A0xcfa7de5d28ee7fad!2sCorporate%20Levels!5e0!3m2!1sen!2sin!4v1742557299013!5m2!1sen!2sin',
    directionUrl: 'https://www.google.com/maps/dir//Corporate+Levels,+150+Feet+Ring+Rd,+Nr-Ayodhya+chowk+Bus+Stop,+360006,+BRTS,+Rajkot,+Gujarat/@22.3225466,70.7651493,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3959c9a1cd664643:0xcfa7de5d28ee7fad!2m2!1d70.7675049!2d22.322493?entry=ttu&g_ep=EgoyMDI1MDMxOC4wIKXMDSoASAFQAw%3D%3D'
  }
];

const MidnightContact = () => {
  return (
    <div className="midnight-home">
      <MidnightPageHeader 
        title="Let's Transform Your Vision into Innovation and Success" 
        subtitle="Transforming ideas into robust, scalable software solutions with expertise." 
      />

      <MidnightContactForm />

      <section className="mn-section">
        <div className="mn-container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mn-section-header mn-center"
          >
            <h2 className="mn-title">Our Development Centers</h2>
            <p className="mn-desc">Find us at our offices.</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '3rem' }}>
            {locations.map((loc, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="mn-glass-card"
                style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ padding: '1.5rem 2rem' }}>
                  <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    {loc.city}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, margin: 0 }}>{loc.address}</p>
                </div>
                <div style={{ width: '100%', height: '500px', flex: 1 }}>
                  <iframe 
                    src={loc.mapSrc} 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <a 
                  href={loc.directionUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mn-btn-outline"
                  style={{ 
                    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', 
                    padding: '1.25rem', borderRadius: 0,
                    borderTop: '1px solid rgba(139,92,246,0.1)'
                  }}
                >
                  Get Direction <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MidnightContact;
