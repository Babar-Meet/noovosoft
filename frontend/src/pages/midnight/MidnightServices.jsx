import React from 'react';
import MidnightPageHeader from './MidnightPageHeader';
import MidnightContactForm from './MidnightContactForm';
import { motion } from 'framer-motion';

const servicesData = [
  {
    id: "Customized-Solutions",
    title: "Tailored Solutions for Your Needs",
    items: [
      { title: "Customized Solutions", desc: "Tailored development strategies aligned with your business needs." },
      { title: "Latest Technologies", desc: "Expertise in modern frameworks, ensuring high performance." },
      { title: "Scalability & Flexibility", desc: "Solutions that grow with your business demands." },
      { title: "Security & Compliance", desc: "Robust security measures to protect data integrity." },
      { title: "User-Centric Approach", desc: "Focused on creating seamless and engaging user experiences." },
      { title: "Dedicated Support", desc: "Continuous maintenance and support for uninterrupted performance." },
      { title: "Proven Track Record", desc: "Successfully serving clients across 14+ countries." }
    ],
    image: "/assets/Customized-Solutions-D5SRngJE.jpg",
    bannerTitle: "Let Noovosoft transform your web presence with innovative and scalable solutions.",
    bannerDesc: "Get in touch with us today!"
  },
  {
    id: "Focused-Expertise",
    title: "Expertise That Drives Results",
    items: [
      { title: "Experienced Team", desc: "Skilled mobile developers with expertise in multiple frameworks and platforms." },
      { title: "End-to-End Services", desc: "From ideation to deployment and post-launch support." },
      { title: "Agile Development Process", desc: "Rapid iteration and continuous delivery for faster time-to-market." },
      { title: "High-Performance Apps", desc: "Optimized for speed, security, and scalability." },
      { title: "User-Centric Design", desc: "Intuitive UI/UX that enhances engagement and retention." },
      { title: "Enterprise-Grade Security", desc: "Secure architecture, encryption, and compliance-driven solutions." },
      { title: "Cross-Platform Expertise", desc: "Native and hybrid solutions tailored to business needs." }
    ],
    image: "/assets/focused-Expertise-C36oxWHG.jpg",
    bannerTitle: "Noovosoft’s focused expertise help businesses innovate, scale, and stay ahead.",
    bannerDesc: "Let’s build the future of mobile technology together!"
  },
  {
    id: "Scalability",
    title: "Built to Scale with Your Growth",
    items: [
      { title: "User-Centered Approach", desc: "Data-backed insights for intuitive and engaging designs." },
      { title: "Cutting-Edge Tools & Technologies", desc: "Expertise in Figma, Adobe XD, Sketch, and more." },
      { title: "Iterative Design Process", desc: "Wireframes, prototypes, and user testing for optimal outcomes." },
      { title: "Cross-Platform Consistency", desc: "Seamless experiences across web and mobile." },
      { title: "Accessibility Compliance", desc: "WCAG and usability best practices implemented." },
      { title: "Conversion-Focused UI", desc: "Designs that drive engagement and business growth." },
      { title: "Agile & Collaborative", desc: "Close client involvement and rapid iterations for success." }
    ],
    image: "/assets/scalability-D6hebFud.jpg",
    bannerTitle: "We transform ideas into visually stunning and functionally superior digital experiences",
    bannerDesc: "Elevate your product with our top-tier UI/UX design expertise."
  },
  {
    id: "Transparent-Operations",
    title: "Operations You Can Trust",
    items: [
      { title: "Industry-leading expertise", desc: "Decades of experience in engineering and quality assurance" },
      { title: "Cutting-edge technology", desc: "Advanced automation tools and AI-driven testing solutions." },
      { title: "Proactive defect prevention", desc: "Early-stage quality checks to reduce failures" },
      { title: "Seamless integration", desc: "QA embedded throughout the software lifecycle" },
      { title: "Agile & scalable solutions", desc: "Adaptable QA strategies tailored to business needs" },
      { title: "Cost-effective testing", desc: "Optimized resources to maximize ROI" }
    ],
    image: "/assets/transparent-operations-BqqsQ3JU.jpg",
    bannerTitle: "With us businesses can reduce risks, accelerate time-to-market, and deliver flawless software experiences.",
    bannerDesc: "our expert QA team ensures excellence at every step."
  },
  {
    id: "Long-Term-Commitment",
    title: "Committed to Your Long-Term Success",
    items: [
      { title: "Proven Track Record of Success", desc: "Noovosoft has consistently delivered high-quality solutions, helping businesses achieve long-term success." },
      { title: "Expertise Across Diverse Industries", desc: "Our experienced team understands the nuances of various industries, ensuring tailored solutions that meet your specific needs." },
      { title: "Cutting-Edge Technology", desc: "We leverage the latest technologies to provide innovative solutions that drive efficiency and business growth." },
      { title: "Dedicated Support and Partnership", desc: "At Noovosoft, we value long-term relationships and provide ongoing support to help your business thrive." },
      { title: "Scalable Solutions for Future Growth", desc: "Our solutions are designed to grow with your business, ensuring flexibility and scalability for future needs." },
      { title: "Commitment to Quality and Excellence", desc: "We prioritize delivering high-quality products and services, ensuring excellence in every aspect of our work." }
    ],
    image: "/assets/Long-Term-Commitment-BSDhSq4B.jpg",
    bannerTitle: "Dedicated to forging lasting partnerships and delivering continuous value.",
    bannerDesc: "Grow alongside a trusted technology partner."
  },
  {
    id: "Cost-Effective-Solutions",
    title: "Smart Solutions, Cost-Effective Results",
    items: [
      { title: "End-to-End Automation", desc: "Streamline workflows from development to deployment." },
      { title: "Scalability & Performance", desc: "Build resilient, high-performing systems." },
      { title: "Security-First Approach", desc: "Implement DevSecOps to mitigate risks early." },
      { title: "Cloud-Native Expertise", desc: "Optimize workloads for AWS, Azure, and GCP." },
      { title: "24/7 Monitoring & Support", desc: "Ensure continuous system reliability." }
    ],
    image: "/assets/cost-effective-DdzFkgmP.jpg",
    bannerTitle: "",
    bannerDesc: ""
  }
];

const MidnightServices = () => {
  return (
    <div className="midnight-home">
      <MidnightPageHeader 
        title="Elevate your Brand Experience <br/> with our Web Development" 
        subtitle="Elevate your Brand Experience with our Web Development" 
        buttonText="Start your Projects"
        buttonLink="/contact"
      />

      <section className="mn-section mn-glass-bg" style={{ padding: '2rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="mn-container mn-center">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
            {[
              { label: 'Customized Solutions', href: '#Customized-Solutions' },
              { label: 'Focused Expertise', href: '#Focused-Expertise' },
              { label: 'Scalability', href: '#Scalability' },
              { label: 'Transparent Operations', href: '#Transparent-Operations' },
              { label: 'Long-Term Commitment', href: '#Long-Term-Commitment' },
              { label: 'Cost-Effective Solutions', href: '#Cost-Effective-Solutions' }
            ].map((link, i) => (
              <li key={i}>
                <a href={link.href} style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem' }}
                   onMouseOver={(e) => { e.currentTarget.style.color = '#fff'; }}
                   onMouseOut={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {servicesData.map((service, index) => (
        <section key={service.id} id={service.id} className={`mn-section ${index % 2 !== 0 ? 'mn-glass-bg' : ''}`}>
          <div className="mn-container">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mn-section-header"
            >
              <h2 className="mn-title">{service.title}</h2>
            </motion.div>

            <div className="mn-grid" style={{ gridTemplateColumns: '1fr 1fr', alignItems: 'center', marginTop: '2rem' }}>
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{ order: index % 2 === 0 ? 1 : 2 }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {service.items.map((item, idx) => (
                    <div key={idx} className="mn-glass-card" style={{ padding: '1.25rem', background: 'rgba(255, 255, 255, 0.02)' }}>
                      <h4 style={{ color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        {item.title}
                      </h4>
                      <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: 0, fontSize: '0.9rem' }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{ order: index % 2 === 0 ? 2 : 1, padding: index % 2 === 0 ? '0 0 0 2rem' : '0 2rem 0 0' }}
              >
                <div className="mn-glass-card" style={{ padding: '0', overflow: 'hidden', borderRadius: '16px', border: '1px solid rgba(139,92,246,0.15)' }}>
                  <img src={service.image} alt={service.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              </motion.div>
            </div>

            {service.bannerTitle && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mn-glass-card"
                style={{ marginTop: '3rem', background: 'linear-gradient(90deg, rgba(139,92,246,0.1) 0%, rgba(139,92,246,0.02) 100%)', borderLeft: '4px solid #a78bfa', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}
              >
                <div>
                  <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '0.5rem' }}>{service.bannerTitle}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>{service.bannerDesc}</p>
                </div>
                <a href="/contact" className="mn-btn-primary" style={{ padding: '0.75rem 1.5rem', textDecoration: 'none' }}>
                  Get in touch <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </motion.div>
            )}
          </div>
        </section>
      ))}

      <MidnightContactForm />
    </div>
  );
};

export default MidnightServices;
