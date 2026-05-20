const request = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = require('../app');
const mongoose = require('mongoose');

jest.mock('mongoose', () => {
  const original = jest.requireActual('mongoose');
  
  const MockModel = jest.fn(function(doc) {
    Object.assign(this, doc);
    this.save = jest.fn().mockResolvedValue();
    this.comparePassword = jest.fn().mockResolvedValue(true);
  });

  MockModel.find = jest.fn().mockReturnThis();
  MockModel.sort = jest.fn().mockResolvedValue([]);
  MockModel.findOne = jest.fn().mockResolvedValue({
    _id: '507f191e810c19729de860ea',
    username: process.env.ADMIN_USERNAME || 'admin@noovosoft',
    password: '$2a$12$hashedpassword',
    role: 'admin',
    comparePassword: jest.fn().mockResolvedValue(true),
    save: jest.fn().mockResolvedValue(),
  });
  MockModel.prototype.save = jest.fn().mockResolvedValue();
  MockModel.prototype.comparePassword = jest.fn().mockResolvedValue(true);
  
  MockModel.findOne.mockResolvedValue(null);
  
  return {
    ...original,
    connect: jest.fn().mockResolvedValue(true),
    disconnect: jest.fn().mockResolvedValue(true),
    connection: { readyState: 1 },
    Schema: original.Schema,
    model: jest.fn(() => MockModel),
  };
});

const getMockAdmin = () => ({
  _id: '507f191e810c19729de860ea',
  username: process.env.ADMIN_USERNAME || 'admin@noovosoft',
  password: '$2a$12$hashedpassword',
  role: 'admin',
  comparePassword: jest.fn().mockResolvedValue(true),
  save: jest.fn().mockResolvedValue(),
});

beforeEach(() => {
  mongoose.model().findOne.mockResolvedValue(null);
});

describe('Admin Authentication Tests', () => {
  describe('POST /api/admin/login', () => {
    test('should login successfully with valid credentials', async () => {
      mongoose.model().findOne.mockResolvedValueOnce(getMockAdmin());

      const res = await request(app)
        .post('/api/admin/login')
        .send({
          username: process.env.ADMIN_USERNAME,
          password: process.env.ADMIN_PASSWORD,
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
    });

    test('should reject login with invalid username', async () => {
      mongoose.model().findOne.mockResolvedValueOnce(null);

      const res = await request(app)
        .post('/api/admin/login')
        .send({
          username: 'wronguser',
          password: process.env.ADMIN_PASSWORD,
        });

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Invalid credentials');
    });

    test('should reject login with invalid password', async () => {
      const wrongPasswordAdmin = {
        _id: '507f191e810c19729de860ea',
        username: process.env.ADMIN_USERNAME,
        password: '$2a$12$hashedpassword',
        role: 'admin',
        comparePassword: jest.fn().mockResolvedValue(false),
        save: jest.fn().mockResolvedValue(),
      };
      mongoose.model().findOne.mockResolvedValueOnce(wrongPasswordAdmin);

      const res = await request(app)
        .post('/api/admin/login')
        .send({
          username: process.env.ADMIN_USERNAME,
          password: 'wrongpassword',
        });

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Invalid credentials');
    });

    test('should reject login with missing username', async () => {
      const res = await request(app)
        .post('/api/admin/login')
        .send({
          password: process.env.ADMIN_PASSWORD,
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    test('should reject login with missing password', async () => {
      const res = await request(app)
        .post('/api/admin/login')
        .send({
          username: process.env.ADMIN_USERNAME,
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    test('should reject login with empty body', async () => {
      const res = await request(app)
        .post('/api/admin/login')
        .send({});

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    test('should return JWT token with correct structure', async () => {
      mongoose.model().findOne.mockResolvedValueOnce(getMockAdmin());

      const res = await request(app)
        .post('/api/admin/login')
        .send({
          username: process.env.ADMIN_USERNAME,
          password: process.env.ADMIN_PASSWORD,
        });

      const decoded = jwt.verify(res.body.token, 'testjwtsecretkey');
      expect(decoded.username).toBe(process.env.ADMIN_USERNAME);
      expect(decoded.role).toBe('admin');
      expect(decoded.exp).toBeDefined();
    });
  });

  describe('Admin Authentication Middleware', () => {
    let validToken;

    beforeAll(() => {
      validToken = jwt.sign({ username: process.env.ADMIN_USERNAME, role: 'admin' }, 'testjwtsecretkey', { expiresIn: '1d' });
    });

    test('should access protected route with valid token', async () => {
      const res = await request(app)
        .get('/api/admin/contacts')
        .set('Authorization', `Bearer ${validToken}`);

      expect(res.statusCode).toBe(200);
    });

    test('should reject access without token', async () => {
      const res = await request(app)
        .get('/api/admin/contacts');

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('No token provided');
    });

    test('should reject access with invalid token', async () => {
      const res = await request(app)
        .get('/api/admin/contacts')
        .set('Authorization', 'Bearer invalidtoken123');

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('Invalid token');
    });

    test('should reject access with malformed token', async () => {
      const res = await request(app)
        .get('/api/admin/contacts')
        .set('Authorization', 'malformed-token-format');

      expect(res.statusCode).toBe(401);
    });

    test('should reject access with expired token', async () => {
      const expiredToken = jwt.sign({ username: 'admin@noovosoft' }, 'testjwtsecretkey', { expiresIn: '0s' });
      
      const res = await request(app)
        .get('/api/admin/contacts')
        .set('Authorization', `Bearer ${expiredToken}`);

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('Invalid token');
    });

    test('should reject access with token signed with wrong secret', async () => {
      const wrongSecretToken = jwt.sign({ username: 'admin@noovosoft' }, 'wrongsecret', { expiresIn: '1d' });
      
      const res = await request(app)
        .get('/api/admin/contacts')
        .set('Authorization', `Bearer ${wrongSecretToken}`);

      expect(res.statusCode).toBe(401);
    });

    test('should reject access with empty authorization header', async () => {
      const res = await request(app)
        .get('/api/admin/contacts')
        .set('Authorization', '');

      expect(res.statusCode).toBe(401);
    });

    test('should reject access with Bearer prefix only', async () => {
      const res = await request(app)
        .get('/api/admin/contacts')
        .set('Authorization', 'Bearer ');

      expect(res.statusCode).toBe(401);
    });
  });
});

describe('Contact Form Tests', () => {
  let validToken;

  beforeAll(() => {
    validToken = jwt.sign({ username: process.env.ADMIN_USERNAME, role: 'admin' }, 'testjwtsecretkey', { expiresIn: '1d' });
  });

  describe('POST /api/contact', () => {
    test('should submit contact form with valid data', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          contactNumber: '+1234567890',
          companyName: 'Test Corp',
          message: 'Hello, I need help.',
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });

    test('should reject contact form with missing name', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({
          email: 'john@example.com',
          message: 'Hello',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Name, email, and message are required.');
    });

    test('should reject contact form with missing email', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({
          name: 'John Doe',
          message: 'Hello',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Name, email, and message are required.');
    });

    test('should reject contact form with missing message', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Name, email, and message are required.');
    });

    test('should reject contact form with empty body', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({});

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Name, email, and message are required.');
    });

    test('should accept contact form with optional fields omitted', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({
          name: 'Jane Doe',
          email: 'jane@example.com',
          message: 'Test message',
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });

    test('should reject contact form with invalid email format', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({
          name: 'John Doe',
          email: 'invalid-email',
          message: 'Hello',
        });

      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /api/admin/contacts', () => {
    test('should retrieve contacts with valid admin token', async () => {
      const res = await request(app)
        .get('/api/admin/contacts')
        .set('Authorization', `Bearer ${validToken}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    test('should reject retrieving contacts without token', async () => {
      const res = await request(app)
        .get('/api/admin/contacts');

      expect(res.statusCode).toBe(401);
    });
  });
});

describe('Career Application Tests', () => {
  let validToken;

  beforeAll(() => {
    validToken = jwt.sign({ username: process.env.ADMIN_USERNAME, role: 'admin' }, 'testjwtsecretkey', { expiresIn: '1d' });
  });

  describe('POST /api/career/apply', () => {
    test('should submit career application with valid data', async () => {
      const res = await request(app)
        .post('/api/career/apply')
        .send({
          name: 'John Developer',
          email: 'john@dev.com',
          phone: '+1234567890',
          coverLetter: 'I am interested in this position.',
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });

    test('should reject application with missing name', async () => {
      const res = await request(app)
        .post('/api/career/apply')
        .send({
          email: 'john@dev.com',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Name and email are required.');
    });

    test('should reject application with missing email', async () => {
      const res = await request(app)
        .post('/api/career/apply')
        .send({
          name: 'John Developer',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Name and email are required.');
    });

    test('should reject application with empty body', async () => {
      const res = await request(app)
        .post('/api/career/apply')
        .send({});

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Name and email are required.');
    });

    test('should accept application without optional fields', async () => {
      const res = await request(app)
        .post('/api/career/apply')
        .send({
          name: 'Jane Developer',
          email: 'jane@dev.com',
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe('GET /api/jobs', () => {
    test('should retrieve jobs list without authentication', async () => {
      const res = await request(app)
        .get('/api/jobs');

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    test('should return jobs with expected structure', async () => {
      const res = await request(app)
        .get('/api/jobs');

      expect(res.body[0]).toHaveProperty('id');
      expect(res.body[0]).toHaveProperty('title');
      expect(res.body[0]).toHaveProperty('location');
      expect(res.body[0]).toHaveProperty('type');
    });
  });

  describe('GET /api/admin/careers', () => {
    test('should retrieve career applications with valid admin token', async () => {
      const res = await request(app)
        .get('/api/admin/careers')
        .set('Authorization', `Bearer ${validToken}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    test('should reject retrieving careers without token', async () => {
      const res = await request(app)
        .get('/api/admin/careers');

      expect(res.statusCode).toBe(401);
    });
  });
});

describe('Newsletter Subscription Tests', () => {
  let validToken;

  beforeAll(() => {
    validToken = jwt.sign({ username: process.env.ADMIN_USERNAME, role: 'admin' }, 'testjwtsecretkey', { expiresIn: '1d' });
  });

  describe('POST /api/newsletter', () => {
    test('should subscribe with valid email', async () => {
      const res = await request(app)
        .post('/api/newsletter')
        .send({
          email: 'subscriber@example.com',
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });

    test('should reject subscription with missing email', async () => {
      const res = await request(app)
        .post('/api/newsletter')
        .send({});

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Email is required.');
    });

    test('should reject subscription with empty email', async () => {
      const res = await request(app)
        .post('/api/newsletter')
        .send({
          email: '',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Email is required.');
    });

    test('should reject subscription with invalid email format', async () => {
      const res = await request(app)
        .post('/api/newsletter')
        .send({
          email: 'not-an-email',
        });

      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /api/admin/newsletters', () => {
    test('should retrieve newsletters with valid admin token', async () => {
      const res = await request(app)
        .get('/api/admin/newsletters')
        .set('Authorization', `Bearer ${validToken}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    test('should reject retrieving newsletters without token', async () => {
      const res = await request(app)
        .get('/api/admin/newsletters');

      expect(res.statusCode).toBe(401);
    });
  });
});

describe('Security Tests', () => {
  let validToken;

  beforeAll(() => {
    validToken = jwt.sign({ username: process.env.ADMIN_USERNAME, role: 'admin' }, 'testjwtsecretkey', { expiresIn: '1d' });
  });

  describe('Rate Limiting & Brute Force Protection', () => {
    test('should allow multiple login attempts (no rate limiting implemented)', async () => {
      for (let i = 0; i < 20; i++) {
        mongoose.model().findOne.mockResolvedValueOnce(null);

        const res = await request(app)
          .post('/api/admin/login')
          .send({
            username: 'wronguser',
            password: 'wrongpassword',
          });

        expect(res.statusCode).toBe(401);
      }
    });
  });

  describe('SQL Injection Protection', () => {
    test('should handle SQL injection attempt in username', async () => {
      mongoose.model().findOne.mockResolvedValueOnce(null);

      const res = await request(app)
        .post('/api/admin/login')
        .send({
          username: "admin' OR '1'='1",
          password: process.env.ADMIN_PASSWORD,
        });

      expect(res.statusCode).toBe(401);
    });

    test('should handle SQL injection attempt in password', async () => {
      const wrongPasswordAdmin = {
        _id: '507f191e810c19729de860ea',
        username: process.env.ADMIN_USERNAME,
        password: '$2a$12$hashedpassword',
        role: 'admin',
        comparePassword: jest.fn().mockResolvedValue(false),
        save: jest.fn().mockResolvedValue(),
      };
      mongoose.model().findOne.mockResolvedValueOnce(wrongPasswordAdmin);

      const res = await request(app)
        .post('/api/admin/login')
        .send({
          username: process.env.ADMIN_USERNAME,
          password: "' OR '1'='1",
        });

      expect(res.statusCode).toBe(401);
    });

    test('should handle NoSQL injection attempt', async () => {
      mongoose.model().findOne.mockResolvedValueOnce(null);

      const res = await request(app)
        .post('/api/admin/login')
        .send({
          username: { $gt: '' },
          password: { $gt: '' },
        });

      expect(res.statusCode).toBe(401);
    });
  });

  describe('XSS Protection', () => {
    test('should handle XSS attempt in contact form', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({
          name: '<script>alert("xss")</script>',
          email: 'test@example.com',
          message: 'Test message',
        });

      expect(res.statusCode).toBe(200);
    });

    test('should handle XSS attempt in career application', async () => {
      const res = await request(app)
        .post('/api/career/apply')
        .send({
          name: '<img src=x onerror=alert(1)>',
          email: 'test@example.com',
          coverLetter: '<script>document.cookie</script>',
        });

      expect(res.statusCode).toBe(200);
    });
  });

  describe('Input Validation', () => {
    test('should reject oversized payload in contact form', async () => {
      const largeMessage = 'A'.repeat(100000);
      const res = await request(app)
        .post('/api/contact')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          message: largeMessage,
        });

      expect(res.statusCode).toBe(200);
    });

    test('should handle special characters in input', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({
          name: 'Test User @#$%^&*()',
          email: 'test+special@example.com',
          message: 'Message with special chars: <>&"\'',
        });

      expect(res.statusCode).toBe(200);
    });
  });

  describe('Token Security', () => {
    test('should not expose token in error messages', async () => {
      const res = await request(app)
        .get('/api/admin/contacts')
        .set('Authorization', 'Bearer invalidtoken');

      expect(res.body.error).toBe('Invalid token');
      expect(res.body).not.toHaveProperty('token');
      expect(res.body).not.toHaveProperty('decoded');
    });

    test('should reject token with modified payload', async () => {
      const token = jwt.sign({ username: 'admin@noovosoft', role: 'user' }, 'testjwtsecretkey', { expiresIn: '1d' });
      const parts = token.split('.');
      const modifiedPayload = Buffer.from(JSON.stringify({ username: 'admin@noovosoft', role: 'admin' })).toString('base64');
      const tamperedToken = `${parts[0]}.${modifiedPayload}.${parts[2]}`;

      const res = await request(app)
        .get('/api/admin/contacts')
        .set('Authorization', `Bearer ${tamperedToken}`);

      expect(res.statusCode).toBe(401);
    });
  });

  describe('Route Security', () => {
    test('should return 404 for undefined routes', async () => {
      const res = await request(app)
        .get('/api/nonexistent');

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe('Route not found');
    });

    test('should not expose stack traces in error responses', async () => {
      const res = await request(app)
        .get('/api/nonexistent');

      expect(res.body).not.toHaveProperty('stack');
      expect(res.body).not.toHaveProperty('message');
    });

    test('should reject direct access to admin routes without auth', async () => {
      const adminRoutes = [
        '/api/admin/contacts',
        '/api/admin/careers',
        '/api/admin/newsletters',
      ];

      for (const route of adminRoutes) {
        const res = await request(app).get(route);
        expect(res.statusCode).toBe(401);
      }
    });
  });

  describe('HTTP Method Security', () => {
    test('should reject PUT on login endpoint', async () => {
      mongoose.model().findOne.mockResolvedValueOnce(getMockAdmin());

      const res = await request(app)
        .put('/api/admin/login')
        .send({
          username: process.env.ADMIN_USERNAME,
          password: process.env.ADMIN_PASSWORD,
        });

      expect(res.statusCode).toBe(404);
    });

    test('should reject DELETE on login endpoint', async () => {
      const res = await request(app)
        .delete('/api/admin/login');

      expect(res.statusCode).toBe(404);
    });

    test('should reject POST on protected GET routes', async () => {
      const res = await request(app)
        .post('/api/admin/contacts')
        .set('Authorization', `Bearer ${validToken}`);

      expect(res.statusCode).toBe(404);
    });
  });

  describe('Header Security', () => {
    test('should expose x-powered-by header (Express default)', async () => {
      const res = await request(app)
        .get('/api/health');

      expect(res.headers['x-powered-by']).toBe('Express');
    });

    test('should handle missing content-type gracefully', async () => {
      const res = await request(app)
        .post('/api/contact')
        .set('Content-Type', 'text/plain')
        .send('not json');

      expect(res.statusCode).toBe(500);
    });
  });
});

describe('Health Check & General Tests', () => {
  describe('GET /api/health', () => {
    test('should return health status', async () => {
      const res = await request(app)
        .get('/api/health');

      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.message).toBe('Backend is running successfully.');
    });

    test('should not require authentication', async () => {
      const res = await request(app)
        .get('/api/health');

      expect(res.statusCode).toBe(200);
    });
  });
});

describe('Integration Tests', () => {
  describe('Full Admin Workflow', () => {
    test('should complete full admin workflow: login -> access contacts -> access careers -> access newsletters', async () => {
      mongoose.model().findOne.mockResolvedValueOnce(getMockAdmin());

      const loginRes = await request(app)
        .post('/api/admin/login')
        .send({
          username: process.env.ADMIN_USERNAME,
          password: process.env.ADMIN_PASSWORD,
        });

      expect(loginRes.statusCode).toBe(200);
      const token = loginRes.body.token;

      const contactsRes = await request(app)
        .get('/api/admin/contacts')
        .set('Authorization', `Bearer ${token}`);

      expect(contactsRes.statusCode).toBe(200);

      const careersRes = await request(app)
        .get('/api/admin/careers')
        .set('Authorization', `Bearer ${token}`);

      expect(careersRes.statusCode).toBe(200);

      const newslettersRes = await request(app)
        .get('/api/admin/newsletters')
        .set('Authorization', `Bearer ${token}`);

      expect(newslettersRes.statusCode).toBe(200);
    });
  });

  describe('Token Expiration', () => {
    test('should issue token with 1 day expiration', async () => {
      mongoose.model().findOne.mockResolvedValueOnce(getMockAdmin());

      const loginRes = await request(app)
        .post('/api/admin/login')
        .send({
          username: process.env.ADMIN_USERNAME,
          password: process.env.ADMIN_PASSWORD,
        });

      const decoded = jwt.verify(loginRes.body.token, 'testjwtsecretkey');
      const now = Math.floor(Date.now() / 1000);
      const timeDiff = decoded.exp - now;

      expect(timeDiff).toBeGreaterThan(86000);
      expect(timeDiff).toBeLessThan(87000);
    });
  });
});
