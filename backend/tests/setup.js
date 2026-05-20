process.env.NODE_ENV = 'test';
process.env.ADMIN_USERNAME = 'admin@noovosoft';
process.env.ADMIN_PASSWORD = 'Noovo@2026!';
process.env.JWT_SECRET = 'testjwtsecretkey';
process.env.MONGO_URI = 'mongodb://localhost:27017/testdb';

const mongoose = require('mongoose');

beforeAll(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.warn('MongoDB not available, tests will use mocks');
  }
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
});
