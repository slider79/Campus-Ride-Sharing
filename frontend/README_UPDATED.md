# 🚗 ON YOUR WAY - Campus Carpooling Platform (MERN Stack)

**Status**: ✅ **Full MERN Implementation** (Frontend + Backend + MongoDB)

This is a **production-ready** MERN stack application with a complete backend, real database integration, and secure authentication.

## 🎯 Project Overview

ON YOUR WAY is a specialized web application built using the **MERN stack** (MongoDB, Express, React, Node.js) to facilitate carpooling exclusively for the **FAST-NUCES Lahore** community. 

**Key Difference from Initial Release**: This is no longer a frontend-only Redux simulation. The backend is fully implemented with:
- ✅ Express.js API server
- ✅ MongoDB database persistence  
- ✅ bcrypt password hashing
- ✅ JWT authentication
- ✅ Role-based access control
- ✅ Real ride bookings and requests

## 🎮 Quick Start

### Prerequisites
- **Node.js v14+** with npm
- **MongoDB** (local or Atlas)

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env        # Configure your environment
node server.js              # Start server (port 3001)
```

### 2. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env        # Configure API URL
npm start                   # Start React app (port 3000)
```

### 3. Login
- **Admin Account**: 
  - Email: `admin@nu.edu.pk`
  - Password: `admin`
- **Demo Admin Account**:
  - Email: `demo.admin@nu.edu.pk`
  - Password: `demoadmin`
- **Or Register**: Create a new passenger account

## 🏗️ Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Frontend** | React 19, Redux Toolkit, React Router | SPA with state management |
| **Backend** | Node.js, Express 5 | REST API server |
| **Database** | MongoDB | Data persistence |
| **Auth** | JWT, bcryptjs | Secure authentication |
| **Maps** | Google Maps API | Location selection |
| **Styling** | CSS | Responsive UI |

## 🌟 Core Features

### 🔐 Authentication & Security
- User registration with email validation
- Secure password hashing (bcryptjs)
- JWT tokens with 7-day expiration
- Role-based navigation (Passenger/Captain/Admin)
- Protected routes with token verification

### 🚗 Ride Management
- **Post a Ride**: Captains set pickup, dropoff, time, seats, price
- **Browse Rides**: Passengers search and filter available rides
- **Book Seats**: Reserve spots with automatic seat count update
- **Location Mapping**: Google Maps + OpenStreetMap geocoding
- **Dynamic Pricing**: Fare calculation based on distance and passengers

### 👨‍✈️ Captain System
- Application submission with vehicle details
- Document upload (ID + License)
- Admin approval workflow
- Captain-only ride posting

### 👥 Admin Dashboard
- View pending captain applications
- Approve/reject applications
- Manage users and oversee platform

### 📍 Ride Requests
- Passengers post ride requests with location
- Location-based matching
- Request history tracking

## 📁 Project Structure

```
campus-rides/
├── backend/                    # Express.js API
│   ├── .env                   # Configuration (create from .env.example)
│   ├── server.js              # Entry point
│   ├── models/                # MongoDB schemas
│   ├── controllers/           # Business logic
│   ├── routes/                # API endpoints
│   └── middleware/            # JWT verification
│
├── frontend/                  # React SPA
│   ├── .env                   # API URL configuration
│   ├── src/
│   │   ├── pages/             # Route components
│   │   ├── slices/            # Redux state
│   │   ├── services/api.js    # API client
│   │   └── App.js             # Routes
│   └── public/
│
└── DEPLOYMENT_GUIDE.md        # Full documentation
```

## 🔌 API Endpoints

### Auth Routes
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login (returns JWT token)
- `PUT /api/users/changePassword` - Change password (protected)

### User Routes
- `GET /api/users/all` - Get all users (admin)
- `PUT /api/users/apply` - Apply for captain status
- `PUT /api/users/approve/:id` - Approve captain (admin only)

### Ride Routes
- `GET /api/rides` - List available rides
- `GET /api/rides/:id` - Get ride details
- `POST /api/rides/postRide` - Post new ride (captains)
- `POST /api/rides/book/:id` - Book a seat
- `GET /api/rides/myRides/all` - Get user's posted rides
- `GET /api/rides/myBookings` - Get user's bookings
- `POST /api/rides/request` - Post ride request
- `GET /api/rides/requests/all` - Get all ride requests

## 🔒 Environment Configuration

### Backend (.env)
```env
MONGO_URI=mongodb://127.0.0.1:27017/campusRideDb
JWT_SECRET=your_secure_secret_key_here
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_BASE_URL=http://localhost:3001/api
```

## 🎯 User Roles & Workflows

### Passenger Flow
1. Register account
2. Browse available rides
3. View ride details and pricing
4. Book a seat
5. Access bookings in "My Bookings"
6. Can request rides if needed

### Captain Flow
1. Register account
2. Apply for captain status (submit vehicle details + docs)
3. Wait for admin approval
4. Post rides with location mapping
5. Track posted rides and bookings

### Admin Flow
1. Login with admin account
2. View pending captain applications
3. Review vehicle and documents
4. Approve/reject applications

## 🧪 Testing the Integration

### Test User Registration
```bash
POST /api/users/register
{
  "userName": "Ahmed Khan",
  "email": "ahmed@nu.edu.pk",
  "password": "secure123",
  "roll": "23L-1234",
  "degree": "BSCS"
}
```

### Test Login
```bash
POST /api/users/login
{
  "email": "ahmed@nu.edu.pk",
  "password": "secure123"
}
# Returns: { token, user, message }
```

### Test Protected Route
```bash
GET /api/rides/myBookings
Headers: {
  "Authorization": "Bearer <jwt_token>"
}
```

## 🚀 Deployment

See **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** for:
- Production checklist
- Hosting platform recommendations
- Environment variable setup
- Database configuration
- Security hardening
- Monitoring & logging

## 🔄 Data Persistence

All data now persists to **MongoDB**:
- User accounts and profiles
- Ride postings and bookings
- Ride requests
- Captain applications
- Transaction history

## ⚠️ Important Notes

### Development vs Production
- **Development**: Uses local MongoDB and plain HTTP
- **Production**: Requires HTTPS, secure JWT secret, and Atlas/cloud MongoDB

### Password Security
- All passwords are **hashed with bcryptjs** (10 salt rounds)
- Never stored in plain text
- Verified securely during login

### Token Expiration
- JWT tokens expire after **7 days**
- Users must login again after expiration
- Token automatically stored in localStorage

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection failed | Check MONGO_URI in .env, ensure mongod is running |
| CORS error | Verify CORS_ORIGIN in backend .env matches frontend URL |
| Login fails | Ensure password is at least 5 characters, bcryptjs is installed |
| API returns 401 | Check JWT token in localStorage, may be expired |
| "Port already in use" | Kill process on port 3001: `lsof -i :3001` or use different port |

## 📚 Documentation

- **Full Documentation**: See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **API Endpoints**: Listed in DEPLOYMENT_GUIDE.md
- **Security Features**: Detailed in DEPLOYMENT_GUIDE.md
- **Database Schema**: In `backend/models/`

## 👥 Group Members
- Member 1 – 23L-3039
- Member 2 – 23L-3024

## 📄 License
This project is part of the FAST-NUCES Web Programming course assignment.

---

**Last Updated**: May 2026  
**Stack**: MERN (MongoDB, Express, React, Node.js)  
**Status**: ✅ Production-Ready
