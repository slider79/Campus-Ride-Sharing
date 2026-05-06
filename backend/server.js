const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const userModel = require('./models/userModel');

async function seedAdminUser({ userName, email, password }) {
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return false;
  }

  const bcrypt = require('bcryptjs');
  const hashedPassword = await bcrypt.hash(password, 10);
  await userModel.create({
    userName,
    email,
    password: hashedPassword,
    role: 'admin'
  });

  return true;
}

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// MongoDB Connection
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/campusRideDb';
mongoose.connect(mongoUri)
.then(async () => {
    console.log("✓ MongoDB connection successful");

    const defaultAdmin = {
      userName: process.env.DEFAULT_ADMIN_NAME || 'Admin Boss',
      email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@nu.edu.pk',
      password: process.env.DEFAULT_ADMIN_PASSWORD || 'admin'
    };

    const demoAdmin = {
      userName: process.env.DEMO_ADMIN_NAME || 'Demo Admin',
      email: process.env.DEMO_ADMIN_EMAIL || 'demo.admin@nu.edu.pk',
      password: process.env.DEMO_ADMIN_PASSWORD || 'demoadmin'
    };

    const defaultCreated = await seedAdminUser(defaultAdmin);
    if (defaultCreated) {
      console.log(`✓ Default admin user created (email: ${defaultAdmin.email})`);
    }

    const demoCreated = await seedAdminUser(demoAdmin);
    if (demoCreated) {
      console.log(`✓ Demo admin user created (email: ${demoAdmin.email})`);
    }
})
.catch((error)=>{
    console.log("✗ MongoDB connection failed:", error.message);
    process.exit(1);
});

// API Routes
const userRoutes = require('./routes/userRoutes');
const rideRoutes = require('./routes/rideRoutes');

app.use('/api/users', userRoutes);
app.use('/api/rides', rideRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
 console.log(`✓ Server running on port ${PORT}`);
});