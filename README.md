# 🚗 FAST Rideshare

The carpooling platform for FASTians by FASTians.

## About

FAST Rideshare is a community-driven ride-sharing application designed for FAST NUCES students. The platform connects students to share rides, reduce commuting costs, and build a safer campus transportation network.

### Why use FAST Rideshare?
- **Save Money** – Split commute expenses with fellow students
- **Verified Users** – Travel securely with verified campus members
- **Reduce Traffic** – Help minimize campus parking congestion
- **Community** – Connect with your fellow FASTians

## Features

- 🔐 **User Authentication** – Secure login and registration
- 🚕 **Post Rides** – Share your commute and earn money
- 🔍 **Browse Rides** – Find available rides matching your schedule
- 📋 **Ride Details** – View detailed information about each ride
- 💾 **My Bookings** – Track your booked rides
- 👤 **User Profiles** – View driver and passenger profiles
- ⚙️ **Dashboard** – Manage your account and preferences
- 🔑 **Change Password** – Update your security settings

## Tech Stack

- **Frontend Framework:** React 19
- **State Management:** Redux Toolkit
- **Routing:** React Router v7
- **Styling:** CSS
- **Build Tool:** Create React App

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/campus-rides.git
cd campus-rides
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Available Scripts

### `npm start`
Runs the app in development mode. The page reloads on code changes.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder with optimizations.

### `npm run eject`
Exposes the configuration (one-way operation).

## Project Structure

```
src/
├── pages/           # Route components
│   ├── Login.js
│   ├── Register.js
│   ├── Dash.js
│   ├── AllRds.js
│   ├── RdDets.js
│   ├── PstRd.js
│   ├── MyBks.js
│   ├── RqRd.js
│   ├── UsrProf.js
│   └── ChgPwd.js
├── slices/          # Redux slices
│   ├── userSlice.js
│   └── rideSlice.js
├── App.js           # Main app component
├── Nav.js           # Navigation component
├── store.js         # Redux store configuration
├── constants.js     # App constants
└── styles.css       # Global styles
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Contact

For questions or feedback, please reach out to the development team.

---

Built with ❤️ for FASTians
