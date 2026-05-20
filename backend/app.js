const express = require('express');
const cors = require('cors');
require('dotenv').config();

const Contact = require('./models/Contact');
const Career = require('./models/Career');
const Newsletter = require('./models/Newsletter');

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Health Check ---
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running successfully.' });
});

// --- Contact Form ---
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, contactNumber, companyName, message, recaptcha_response, validityName } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    console.log('Received contact form submission from:', email);
    
    // Save to DB
    const contact = new Contact({ name, email, contactNumber, companyName, message });
    await contact.save();

    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving contact submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- Career Application Form ---
app.post('/api/career/apply', async (req, res) => {
  try {
    const { name, email, phone, coverLetter } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

    console.log('Received career application from:', email);
    
    // Save to DB
    const application = new Career({ name, email, phone, coverLetter });
    await application.save();

    res.status(200).json({ success: true, message: 'Application submitted successfully!' });
  } catch (error) {
    console.error('Error saving career application:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- Jobs List ---
app.get('/api/jobs', (req, res) => {
  // Mock data for jobs
  const jobs = [
    { id: 1, title: 'Senior React Developer', location: 'Pune, India', type: 'Full-time' },
    { id: 2, title: 'Backend Node.js Engineer', location: 'Rajkot, India', type: 'Full-time' },
    { id: 3, title: 'UI/UX Designer', location: 'Remote', type: 'Contract' },
  ];
  res.status(200).json(jobs);
});

// --- Newsletter Subscription ---
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    console.log('Received newsletter subscription for:', email);
    
    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email is already subscribed.' });
    }

    // Save to DB
    const subscriber = new Newsletter({ email });
    await subscriber.save();

    res.status(200).json({ success: true, message: 'Subscribed successfully!' });
  } catch (error) {
    console.error('Error saving newsletter subscription:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- ADMIN ROUTES ---
const jwt = require('jsonwebtoken');

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Auth Middleware
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  
  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.admin = decoded;
    next();
  });
};

// Admin Endpoints
app.get('/api/admin/contacts', authenticateAdmin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/admin/careers', authenticateAdmin, async (req, res) => {
  try {
    const careers = await Career.find().sort({ createdAt: -1 });
    res.json(careers);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/admin/newsletters', authenticateAdmin, async (req, res) => {
  try {
    const newsletters = await Newsletter.find().sort({ createdAt: -1 });
    res.json(newsletters);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- Catch-all for undefined routes ---
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;
