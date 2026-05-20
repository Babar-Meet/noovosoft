import React from 'react';
import { motion } from 'framer-motion';

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

const MidnightContactForm = () => {
  return (
    <section className="mn-section mn-dark-bg">
      <div className="mn-container">
        <motion.div
          className="mn-section-header"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <span className="mn-tag">Let's build something great together</span>
          <h2 className="mn-title">Get In Touch</h2>
        </motion.div>

        <motion.form
          className="mn-form"
          initial="hidden"
          animate="visible"
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
  );
};

export default MidnightContactForm;
