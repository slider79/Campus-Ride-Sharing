
# 🚗 ON YOUR WAY - Web Engineering Project

**Group Members:**
* Member 1 – 23L-3039
* Member 2 – 23L-3024

## About The Project

ON YOUR WAY is a specialized web application built using the MERN stack to facilitate carpooling exclusively for the FAST-NUCES Lahore community. This platform addresses the high cost of commuting and limited parking at the Lahore campus by connecting students who have vehicles ("Captains") with those living in nearby areas ("Passengers").

**Note for Evaluators:** *This repository currently contains the Frontend implementation. To ensure a fully interactive demo without a live backend or paid database, we are using Redux Toolkit as an in-memory data store to simulate all backend operations (Admin approvals, user registration, ride matching, and live chat).*

## Core Objectives & Features

* 🔐 **Secure Onboarding:** Implements a two-step verification process where drivers must be manually approved by an Admin before hosting rides.
* 🗺️ **Smart Matching:** Utilizes the Google Maps API for a dual-pin system, allowing both Captains and Passengers to broadcast locations. (Includes an auto-fill feature defaulting one location to FAST NUCES).
* 💰 **Dynamic Fare Distribution:** An automated fair-split system based on distance and the number of active passengers in a ride. 
  * Base Fare: 50 PKR per passenger.
  * Distance Charge: 25 PKR per km.
* 💬 **Community Trust:** Features a real-time communication chat module and tracking layer for students traveling together.

## Tech Stack

* **Frontend Framework:** React 19
* **State Management:** Redux Toolkit (Simulating MongoDB/Backend)
* **Routing:** React Router v7
* **Maps Integration:** `@react-google-maps/api` (Visuals) & OpenStreetMap Nominatim API (Free Reverse Geocoding)
* **Styling:** CSS (Minimalist UI)

## Getting Started

### Prerequisites
* Node.js (v14 or higher)
* npm

### Installation

1. Clone the repository:
```bash
git clone [https://github.com/YOUR_USERNAME/campus-rides.git](https://github.com/YOUR_USERNAME/campus-rides.git)
cd campus-rides
````

2.  Install dependencies (including the Maps API):

<!-- end list -->

```bash
npm install
npm install @react-google-maps/api
```

3.  Start the development server:

<!-- end list -->

```bash
npm start
```

The app will open at [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)

### ⚠️ Important Demo Instructions

  * **Admin Access:** To view the Admin Approval Dashboard, log in using the default admin credentials:
      * **Email:** `admin@nu.edu.pk`
      * **Password:** `admin`
  * **Google Maps:** The Google Maps API key is intentionally left blank to trigger "Development Mode" to avoid credit card billing. The map will show a "For development purposes only" watermark, but all drag-and-drop pin functionality and OpenStreetMap address fetching works perfectly.

## Project Structure

```text
src/
├── pages/           # Route components
│   ├── Login.js         # User Authentication
│   ├── Register.js      # Student Verification & Signup
│   ├── Dash.js          # Main user dashboard
│   ├── AdminDash.js     # Admin Approval Dashboard
│   ├── CaptReg.js       # Captain Registration portal
│   ├── AllRds.js        # Browse requested and offered rides
│   ├── RdDets.js        # Ride details (Includes FareCalc integration)
│   ├── PstRd.js         # Route Pins for Captains
│   ├── RqRd.js          # Request Pins for Passengers
│   ├── MyBks.js         # Track booked rides
│   ├── UsrProf.js       # View student/captain profiles
│   └── ChgPwd.js        # Password management
├── slices/          # Redux slices (Simulating Backend)
│   ├── userSlice.js     # Manages roles, admin approvals, and auth
│   └── rideSlice.js     # Manages rides, bookings, and live chat
├── App.js           # Main app component & Routes
├── Nav.js           # Role-based Navigation component
├── store.js         # Redux store configuration
├── constants.js     # App constants (Degrees, Lahore Locations)
└── styles.css       # Global styles
```

-----

Built for FASTians, by FASTians.

```
```