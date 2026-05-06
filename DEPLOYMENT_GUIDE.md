# Campus Rides - Full MERN Stack Implementation

## ✅ Project Status
This is a fully-integrated MERN stack application with a working Node.js/Express backend and React frontend connected to MongoDB.

### What Changed from Initial State
- **Backend**: Now uses environment variables, bcrypt password hashing, and proper JWT token generation
- **Frontend**: Integrated with real backend API endpoints (no longer Redux-only simulation)
- **Database**: All user data, rides, bookings, and requests now persist to MongoDB
- **Security**: Passwords are hashed using bcryptjs; JWT tokens expire after 7 days

## 🏗️ Architecture

```
campus-rides/
├── backend/                    # Node.js/Express API
│   ├── .env                    # Environment configuration (create from .env.example)
│   ├── server.js               # Express server entry point
│   ├── models/                 # MongoDB schemas
│   │   ├── userModel.js        # User schema (with role-based access)
│   │   ├── rideModel.js        # Ride schema
│   │   ├── bookingModel.js     # Booking schema (links users to rides)
│   │   └── requestModel.js     # Ride request schema
│   ├── controllers/            # Business logic
│   │   ├── userController.js   # Auth, registration, captain approval
│   │   └── rideController.js   # Ride CRUD, bookings, requests
│   ├── routes/                 # API endpoints
│   │   ├── userRoutes.js
│   │   └── rideRoutes.js
│   └── middleware/
│       └── authMiddleware.js   # JWT verification
│
└── frontend/                   # React SPA
    ├── .env                    # Environment configuration
    ├── public/
    ├── src/
    │   ├── services/api.js     # API client (calls backend)
    │   ├── slices/             # Redux state management
    │   ├── pages/              # Route components
    │   ├── App.js              # Route definitions
    │   ├── store.js            # Redux store
    │   └── ProtectedRoute.js   # Auth guard component
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** v14+ with npm
- **MongoDB** running locally on `mongodb://127.0.0.1:27017` or specify `MONGO_URI` in `.env`

### Installation

#### Backend Setup
```bash
cd backend
npm install
cp .env.example .env        # Create .env from template
node server.js              # Start server on port 3001
```

The `.env` file should contain:
```env
MONGO_URI=mongodb://127.0.0.1:27017/campusRideDb
JWT_SECRET=your_secure_secret_key_here
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

#### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env        # Create .env from template
npm start                   # Start on http://localhost:3000
```

The `.env` file should contain:
```env
REACT_APP_API_BASE_URL=http://localhost:3001/api
```

## 🔐 Authentication & Authorization

### User Roles
- **Passenger**: Can browse rides, request rides, book seats
- **Captain**: Can post rides and accept bookings (requires admin approval after application)
- **Admin**: Can approve captain applications and manage the platform

### Login Flow
1. User provides email and password
2. Backend validates credentials and hashes password with bcrypt
3. JWT token issued (expires in 7 days)
4. Frontend stores token in localStorage and Redux
5. Protected routes check for valid token before rendering

### Default Admin Account
- **Email**: `admin@nu.edu.pk`
- **Password**: `admin`
- **Created automatically on first server startup**

### Demo Admin Account
- **Email**: `demo.admin@nu.edu.pk`
- **Password**: `demoadmin`
- **Created automatically on first server startup**

## 📡 API Endpoints

### User Routes (`/api/users`)
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/register` | No | Register new user |
| POST | `/login` | No | Login user, return JWT token |
| POST | `/logout` | Yes | Clear session (frontend only) |
| PUT | `/changePassword` | Yes | Update password |
| GET | `/all` | Yes | Get all users (admin only) |
| PUT | `/apply` | Yes | Apply for captain status |
| PUT | `/approve/:id` | Yes (admin) | Approve captain application |

### Ride Routes (`/api/rides`)
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | `/` | No | List available active rides |
| GET | `/myRides/all` | Yes | Get rides posted by current user |
| GET | `/:id` | No | Get specific ride details |
| POST | `/postRide` | Yes | Post a new ride (captains only) |
| POST | `/book/:id` | Yes | Book a seat in a ride |
| GET | `/myBookings` | Yes | Get user's bookings |
| POST | `/request` | Yes | Post a ride request |
| GET | `/requests/all` | No | Get all active ride requests |

## 🔄 Data Flow Examples

### Register New User
```
User fills form → Frontend validates → POST /api/users/register 
→ Backend hashes password with bcrypt → MongoDB saves → Success message
```

### Login
```
User enters credentials → POST /api/users/login 
→ Backend verifies with bcrypt.compare() → JWT token issued 
→ Frontend saves token + user data → Redirect to dashboard
```

### Post a Ride
```
Captain fills ride form → POST /api/rides/postRide (+ JWT token)
→ Backend verifies JWT → Creates ride document in MongoDB
→ Ride appears in all passengers' ride lists
```

### Book a Seat
```
Passenger clicks "Book Seat" → POST /api/rides/book/:rideId (+ JWT token)
→ Backend decrements available seats → Updates ride document
→ Booking record created in Booking collection
→ Appears in passenger's "My Bookings" list
```

## 🛠️ Environment Variables

### Backend (.env)
```env
# MongoDB Connection String
MONGO_URI=mongodb://127.0.0.1:27017/campusRideDb

# JWT Secret (change this in production!)
JWT_SECRET=campusRideSecureKeyChange123!@#

# Server Port
PORT=3001

# Environment (development, staging, production)
NODE_ENV=development

# CORS Origin (allow requests from this URL only)
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```env
# Backend API Base URL
REACT_APP_API_BASE_URL=http://localhost:3001/api
```

## 📦 Dependencies

### Backend
- **express**: Web server framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT token generation and verification
- **bcryptjs**: Password hashing
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Frontend
- **react**: UI framework
- **react-redux**: State management bindings
- **@reduxjs/toolkit**: Redux utilities
- **react-router-dom**: Client-side routing
- **@react-google-maps/api**: Google Maps integration

## 🧪 Testing the Application

### 1. Create an Account
- Navigate to http://localhost:3000/register
- Fill in user details and submit
- Password is hashed with bcrypt before saving

### 2. Login
- Use your registered email and password
- Token automatically stored in localStorage
- Dashboard displays personalized greeting

### 3. Apply for Captain Status
- Click "Be a Captain" from navigation
- Upload vehicle details and documents
- Admin reviews in Admin Dashboard

### 4. Post a Ride (Captains)
- After captain approval, "Post Ride" link appears
- Fill in pickup/dropoff locations using map
- Ride is immediately visible to all passengers

### 5. Request a Ride (Passengers)
- Click "Request Ride" from navigation
- Set your location on the map
- Other users see your request in ride requests tab

### 6. Book a Seat
- Browse available rides in "All Rides"
- Click "View Details" and "Book Seat"
- Seat count decreases; ride added to "My Bookings"

## 🔒 Security Features

✅ **Password Security**
- Passwords hashed with bcryptjs (salt rounds: 10)
- Never stored in plain text
- Compared securely during login

✅ **Authentication**
- JWT tokens with 7-day expiration
- Tokens verified on protected routes
- Automatic logout if token invalid/expired

✅ **Authorization**
- Role-based access control (passenger/captain/admin)
- ProtectedRoute component guards frontend routes
- Backend checks user role on sensitive operations

✅ **CORS**
- Configured to accept requests from localhost:3000 only (development)
- Can be restricted to specific origins in production

## 📱 Features

### User Management
- User registration with email verification via form validation
- Secure password hashing with bcrypt
- JWT-based session management
- Role-based navigation (passenger vs captain)
- Profile management and password change

### Ride Management
- Captains can post rides with location, time, seats, price
- Google Maps integration for location selection
- Dynamic fare calculation based on distance and passenger count
- Real-time seat availability tracking
- Booking confirmation and history

### Captain System
- Two-tier verification: form submission + admin approval
- Document upload (base64 encoded in current version)
- Captain profile with vehicle details
- Ability to track posted rides and bookings

### Admin Panel
- View all pending captain applications
- Approve/reject applications
- User management and oversight

### Ride Requests
- Passengers can post ride requests with location
- Location-based matching via map integration
- Request history and tracking

## 🚢 Deployment Checklist

### Before Production
- [ ] Change `JWT_SECRET` to a secure random string
- [ ] Set `NODE_ENV=production`
- [ ] Update `MONGO_URI` to production MongoDB (e.g., MongoDB Atlas)
- [ ] Change `CORS_ORIGIN` to your production domain
- [ ] Update `REACT_APP_API_BASE_URL` to production API domain
- [ ] Enable HTTPS for all endpoints
- [ ] Set up environment-based API URL switching in frontend
- [ ] Add rate limiting to API endpoints
- [ ] Implement request/response logging
- [ ] Set up monitoring and error tracking (Sentry, DataDog, etc.)
- [ ] Database backups and disaster recovery plan
- [ ] SSL/TLS certificates for HTTPS
- [ ] Input validation and sanitization
- [ ] CSRF protection if adding form submissions
- [ ] API versioning strategy
- [ ] Documentation for API endpoints

### Deployment Platforms
**Backend** can be deployed to:
- Heroku
- AWS Elastic Beanstalk
- DigitalOcean App Platform
- Vercel (with serverless functions)
- Railway
- Render

**Frontend** can be deployed to:
- Vercel (recommended for React)
- Netlify
- AWS S3 + CloudFront
- GitHub Pages
- Firebase Hosting

**Database** can be hosted on:
- MongoDB Atlas (cloud MongoDB)
- AWS DocumentDB
- DigitalOcean MongoDB
- Self-hosted MongoDB instance

## 📝 Common Issues & Solutions

### Issue: "Backend server not running"
```bash
# Check if Node.js is installed
node --version

# Check MongoDB is running
# On macOS: brew services list | grep mongo
# On Windows: Look for mongod.exe in Services

# Ensure .env has correct MONGO_URI
```

### Issue: "CORS Error in browser console"
```bash
# Verify CORS_ORIGIN in backend .env matches frontend domain
# For development, should be: http://localhost:3000
```

### Issue: "Password hashing not working"
```bash
# Ensure bcryptjs is installed
npm list bcryptjs

# Reinstall if needed
npm install bcryptjs
```

### Issue: "Protected route redirects to login"
```bash
# Check if JWT token is stored in localStorage
# Verify token expiration (7 days)
# Check Authorization header format: "Bearer <token>"
```

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT Introduction](https://jwt.io/introduction)
- [React Documentation](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [bcryptjs Documentation](https://github.com/dcodeIO/bcrypt.js)

## 📧 Support

For issues or questions:
1. Check existing GitHub issues
2. Review the API documentation above
3. Check browser console for client errors
4. Check backend logs in terminal
5. Verify MongoDB connection

## 📄 License

This project is part of the FAST-NUCES Web Programming course assignment.

---

**Last Updated**: May 2026  
**Stack**: MERN (MongoDB, Express, React, Node.js)  
**Status**: Production-ready (with security configuration)
