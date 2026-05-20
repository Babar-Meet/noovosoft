import React from 'react';
import Hero from '../../components/Hero';
import { motion } from 'framer-motion';
import './MidnightHome.css';

/* Reusable animation variants */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const MidnightHome = () => {
  return (
    <div className="midnight-home">
      {/* ═══════════════ HERO ═══════════════ */}
      <Hero />

      {/* ═══════════════ WHAT WE OFFER ═══════════════ */}
      <section className="mn-section mn-glass-bg">
        <div className="mn-container">
          <motion.div
            className="mn-section-header"
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
          >
            <span className="mn-tag">We Help Businesses</span>
            <h2 className="mn-title">What We Offer</h2>
          </motion.div>

          <motion.div
            className="mn-featured-card"
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={scaleIn}
          >
            <div className="mn-featured-glow" />
            <div className="mn-featured-content">
              <p className="mn-lead">
                <span className="mn-accent">We empower companies to move faster</span>—without
                compromising quality or security. By combining agile methodologies, a product-first
                mindset, deep technical expertise, and{' '}
                <span className="mn-accent">AI-powered DevSecOps</span>, we accelerate software
                delivery while upholding the highest standards.
              </p>
              <p className="mn-sub">
                But for us, it's never just about code or tools. It's about outcomes—real results
                that matter to your business. We align with your goals, work as an extension of your
                team, and build solutions that truly move you forward—not just tick boxes.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="mn-offer-grid"
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            {[
              {
                title: 'Innovative Startups',
                desc: 'We partner with startups to turn breakthrough ideas into scalable products. Leveraging cutting-edge technologies, advanced AI tools and fast-moving strategies, we help founders build innovative solutions to disrupt markets, attract investors and accelerate growth from day one.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 3.86-11.75s5.74-.83 9.4 2.83c3.65 3.66 2.82 9.4 2.82 9.4A22 22 0 0 1 12 15z"/><path d="M12.98 12.98 11.5 14.5"/><path d="m16.5 7.5-.5.5"/></svg>
                ),
              },
              {
                title: 'Small to Midsize Companies',
                desc: 'Empowering the growth of dynamic businesses through tailored Software development utilizing AI capabilities—to unlock their full potential, optimize operations, and support sustainable expansion.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                ),
              },
              {
                title: 'Business Transformation & Innovation',
                desc: 'Driving comprehensive business transformation by integrating AI tools, intelligent automation, and innovative technologies. We help companies rethink processes, enter new markets, and accelerate digital maturity.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                ),
              },
              {
                title: 'Enterprise Solutions',
                desc: 'Future-proofing enterprises with AI-driven, scalable technology frameworks that enhance operational efficiency, reduce costs, and accelerate performance across global teams.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
                ),
              },
            ].map((item, i) => (
              <motion.div className="mn-card mn-offer-card" key={i} custom={i} variants={fadeUp}>
                <span className="mn-card-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="mn-card-shine" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ WHY CHOOSE US ═══════════════ */}
      <section className="mn-section mn-dark-bg">
        <div className="mn-container">
          <motion.div
            className="mn-section-header mn-center"
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
          >
            <span className="mn-tag">Custom Software Solutions</span>
            <h2 className="mn-title">Why Choose Us</h2>
            <p className="mn-desc">
              Smart tech, strong code, and customer focus—our formula for building secure, scalable
              solutions that move your business faster.
            </p>
          </motion.div>

          <motion.div
            className="mn-why-grid"
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            {[
              { title: 'Customized Solutions', desc: 'We design our services to fit the unique challenges and goals of your company, offering bespoke solutions that align with your specific vision and requirements.', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
              ) },
              { title: 'Focused Expertise', desc: 'Our services are tailored specifically for tech companies, providing the robust technical foundation you need at critical growth stages.', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              ) },
              { title: 'Scalability', desc: 'We specialize in scaling alongside your organization, with an agile HR and recruitment process that adjusts to your growing needs.', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><rect x="7" y="10" width="4" height="11" rx="1"/><rect x="15" y="3" width="4" height="18" rx="1"/></svg>
              ) },
              { title: 'Transparent Operations', desc: 'We prioritize clarity and honesty in our communications, ensuring you are always informed about project progress and processes.', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              ) },
              { title: 'Long-Term Commitment', desc: 'We aim to be more than just a service provider; we seek to be a partner in your long-term success and evolution.', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76l-1.15 4.88a2 2 0 0 1-3.1 1.25z"/></svg>
              ) },
              { title: 'Cost-Effective Solutions', desc: 'Our India-based development team combines deep technical expertise with AI-driven innovation to deliver smart, secure and scalable solutions—at a cost that maximizes your ROI.', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              ) },
            ].map((item, i) => (
              <motion.div className="mn-card mn-why-card" key={i} custom={i} variants={fadeUp}>
                <div className="mn-why-icon">{item.icon}</div>
                <div className="mn-why-text">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ COMPLIANCE ═══════════════ */}
      <section className="mn-section mn-glass-bg">
        <div className="mn-container">
          <motion.div
            className="mn-compliance-header"
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
          >
            <div>
              <span className="mn-tag">Compliance Practices We Uphold</span>
              <h2 className="mn-title">Ensuring Data Security and Privacy</h2>
            </div>
            <a className="mn-btn-outline" href="/contact">
              Connect With Us <span className="mn-arrow">→</span>
            </a>
          </motion.div>

          <motion.div
            className="mn-compliance-grid"
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            <motion.div className="mn-compliance-image" variants={fadeUp}>
              <img src="/assets/Protecting-Your-Data-BcSD8xQO.jpg" alt="Protecting Your Data" />
              <div className="mn-image-overlay" />
            </motion.div>
            <div className="mn-compliance-badges">
              {[
                { src: '/assets/iso-9001-Bo71JlVg.png', alt: 'ISO 9001' },
                { src: '/assets/ukas-CuSZtO0i.png', alt: 'ISO UKAS' },
                { src: '/assets/GDPR-Bzlt2_Fj.jpg', alt: 'GDPR' },
                { src: '/assets/iso-27001-BL7fUpLQ.png', alt: 'ISO 27001' },
              ].map((badge, i) => (
                <motion.div className="mn-badge" key={i} custom={i} variants={fadeUp}>
                  <img src={badge.src} alt={badge.alt} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ CASE STUDIES ═══════════════ */}
      <section className="mn-section mn-dark-bg">
        <div className="mn-container">
          <motion.div
            className="mn-section-header mn-center"
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
          >
            <span className="mn-tag">How Did Noovosoft Help</span>
            <h2 className="mn-title">Top Case Studies</h2>
          </motion.div>

          <motion.div
            className="mn-case-grid"
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            {[
              {
                img: '/assets/homepage-case-studies-1-CDf45Wyt.jpg',
                title: 'Revolutionizing Accounting Practices Through Automation',
                desc: 'In the rapidly evolving field of accounting, firms face increasing pressures to manage vast volumes of client data, comply with complex regulations, and meet stringent government submission requirements.',
              },
              {
                img: '/assets/homepage-case-studies-2-DphaSjkK.jpg',
                title: 'Transforming Dairy Farming: The Power of Smart Agri-Tech',
                desc: 'An AgriTech company has developed a comprehensive SaaS platform tailored for dairy farms and advisors, addressing key challenges in emissions management, feed optimization, and profitability.',
              },
            ].map((cs, i) => (
              <motion.div className="mn-card mn-case-card" key={i} custom={i} variants={fadeUp}>
                <div className="mn-case-img">
                  <img src={cs.img} alt={cs.title} />
                  <div className="mn-case-img-overlay" />
                </div>
                <div className="mn-case-body">
                  <h3>{cs.title}</h3>
                  <p>{cs.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mn-center"
            style={{ marginTop: '3rem' }}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <a className="mn-btn-outline" href="/casestudy">
              See All Case Studies <span className="mn-arrow">→</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ OUR CULTURE ═══════════════ */}
      <section className="mn-section mn-glass-bg">
        <div className="mn-container">
          <motion.div
            className="mn-culture-wrap"
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            <motion.div className="mn-culture-text" variants={fadeUp}>
              <span className="mn-tag">Exploring Diversity and Innovation</span>
              <h2 className="mn-title">Our Culture</h2>
              <div className="mn-culture-list">
                {['Integrity and Trust', 'Cooperation and Diversity', 'Growth and Drive', 'Work-Life Balance', 'Commitment to Excellence'].map(
                  (item, i) => (
                    <motion.div className="mn-culture-item" key={i} custom={i} variants={fadeUp}>
                      <div className="mn-culture-dot" />
                      <span>{item}</span>
                    </motion.div>
                  )
                )}
              </div>
              <a className="mn-btn-outline" href="/culture" style={{ marginTop: '2rem' }}>
                Learn More <span className="mn-arrow">→</span>
              </a>
            </motion.div>
            <motion.div className="mn-culture-img" variants={scaleIn}>
              <img src="/assets/Our-Culture-C5GiZkKe.jpg" alt="Our Culture" />
              <div className="mn-image-overlay" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ CTA BANNER ═══════════════ */}
      <section className="mn-section mn-cta-section">
        <div className="mn-cta-glow" />
        <div className="mn-cta-glow mn-cta-glow-2" />
        <motion.div
          className="mn-container mn-center"
          initial="hidden"
          animate="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
        >
          <h2 className="mn-cta-title">Your goals deserve top-tier talent</h2>
          <p className="mn-desc">Contact us to schedule a free project consultation.</p>
          <a className="mn-btn-primary" href="/contact">
            <span>Let's work together</span>
            <span className="mn-arrow">→</span>
          </a>
        </motion.div>
      </section>

      {/* ═══════════════ GET IN TOUCH ═══════════════ */}
      <section className="mn-section mn-dark-bg">
        <div className="mn-container">
          <motion.div
            className="mn-section-header"
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
          >
            <span className="mn-tag">Let's build something great together</span>
            <h2 className="mn-title">Get In Touch</h2>
          </motion.div>

          <motion.form
            className="mn-form"
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            onSubmit={(e) => e.preventDefault()}
          >
            <motion.div className="mn-form-row" variants={fadeUp}>
              <div className="mn-form-group">
                <input type="text" placeholder="Name" name="name" className="mn-input" />
              </div>
              <div className="mn-form-group">
                <input type="email" placeholder="Email ID" name="email" className="mn-input" />
              </div>
            </motion.div>
            <motion.div className="mn-form-row" variants={fadeUp}>
              <div className="mn-form-group">
                <input type="text" placeholder="Contact Number" name="contactNumber" className="mn-input" />
              </div>
              <div className="mn-form-group">
                <input type="text" placeholder="Company Name" name="companyName" className="mn-input" />
              </div>
            </motion.div>
            <motion.div className="mn-form-group mn-full" variants={fadeUp}>
              <textarea placeholder="Message" name="message" className="mn-input mn-textarea" rows="5" />
            </motion.div>
            <motion.div variants={fadeUp}>
              <button type="submit" className="mn-btn-primary">
                <span>Submit</span>
                <span className="mn-arrow">→</span>
              </button>
            </motion.div>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default MidnightHome;
