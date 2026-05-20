const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/noovosoft';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
  console.error('Error: ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env');
  console.error('Example:');
  console.error('  ADMIN_USERNAME=admin@noovosoft');
  console.error('  ADMIN_PASSWORD=YourSecurePassword123!');
  process.exit(1);
}

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const existingAdmin = await Admin.findOne({ username: ADMIN_USERNAME });
    if (existingAdmin) {
      console.log('Admin user already exists. Skipping seed.');
      await mongoose.disconnect();
      process.exit(0);
    }

    const admin = new Admin({
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD,
      role: 'admin',
    });

    await admin.save();
    console.log('Admin user created successfully!');
    console.log(`Username: ${ADMIN_USERNAME}`);
    console.log('Please change the password after first login.');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedAdmin();
