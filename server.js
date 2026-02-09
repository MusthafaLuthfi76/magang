const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 8000;
const JWT_SECRET = 'your-secret-key-change-this-in-production';

// Middleware
app.use(cors());
app.use(express.json());

// Simulated database - in-memory storage
let users = [
  {
    id: 1,
    email: 'admin@dinas.gov.id',
    password: '$2a$10$YourHashedPasswordHere', // Will be set properly below
    name: 'Administrator',
    role: 'admin'
  },
  {
    id: 2,
    email: 'user@dinas.gov.id',
    password: '$2a$10$YourHashedPasswordHere', // Will be set properly below
    name: 'User Test',
    role: 'user'
  }
];

// Initialize hashed passwords
async function initializePasswords() {
  users[0].password = await bcrypt.hash('Admin@123', 10);
  users[1].password = await bcrypt.hash('User@123', 10);
}

// Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ detail: 'Email dan password harus diisi' });
    }

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ detail: 'Email atau password salah' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ detail: 'Email atau password salah' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return user data without password
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    };

    res.json({
      token,
      user: userData,
      message: 'Login berhasil'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ detail: 'Terjadi kesalahan server' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, role = 'user' } = req.body;

    // Validation
    if (!email || !password || !name) {
      return res.status(400).json({ detail: 'Email, password, dan nama harus diisi' });
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ detail: 'Email sudah terdaftar' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      name,
      role
    };

    users.push(newUser);

    res.status(201).json({
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      },
      message: 'Registrasi berhasil'
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ detail: 'Terjadi kesalahan server' });
  }
});

// Verify token middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ detail: 'Token tidak ditemukan' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ detail: 'Token tidak valid' });
  }
};

// Protected route example
app.get('/api/auth/me', verifyToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ detail: 'User tidak ditemukan' });
  }

  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server running' });
});

// Start server
app.listen(PORT, async () => {
  await initializePasswords();
  console.log(`
╔════════════════════════════════════════════════╗
║   Server running at http://localhost:${PORT}   ║
║                                                ║
║   Demo Credentials:                            ║
║   Email: admin@dinas.gov.id                    ║
║   Password: Admin@123                          ║
║                                                ║
║   Email: user@dinas.gov.id                     ║
║   Password: User@123                           ║
╚════════════════════════════════════════════════╝
  `);
});
