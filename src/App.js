import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './styles.css';

// Import your new Hero Banner Image
import heroImg from './assets/fast_nuces_noir_20260405_221517.png';

// Components & Pages
import Nav from './Nav';
import ProtectedRoute from './ProtectedRoute'; 
import Login from './pages/Login';
import Register from './pages/Register';
import Dash from './pages/Dash';
import AllRds from './pages/AllRds';
import RdDets from './pages/RdDets';
import PstRd from './pages/PstRd';
import MyBks from './pages/MyBks';
import RqRd from './pages/RqRd';
import UsrProf from './pages/UsrProf';
import MyProfile from './pages/MyProfile'; 
import AdminDash from './pages/AdminDash';
import CaptReg from './pages/CaptReg';

export default function App() 
{
  return (
    <BrowserRouter>
      <Nav />
        <Routes>
        
        {/* Public Routes */}
        <Route path="/" element=
        {
            <div style={{ width: '100%', margin: 0, padding: 0 }}>
                
                {/* Hero Banner Section - Now truly full width */}
                <div style={{ width: '100%', height: '350px', backgroundColor: '#111', position: 'relative' }}>
                    <img 
                        src={heroImg} 
                        alt="FAST NUCES Lahore Campus" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} 
                    />
                    {/* Text overlay shifted slightly to align better with a full-width layout */}
                    <div style={{ position: 'absolute', bottom: '40px', left: '5%', color: 'white', textShadow: '2px 2px 6px rgba(0,0,0,0.9)' }}>
                        <h1 style={{ margin: 0, fontSize: '42px', fontWeight: 'bold' }}>On Your Way</h1>
                        <p style={{ margin: 0, fontSize: '18px', marginTop: '8px' }}>The carpooling platform for FASTians by FASTians.</p>
                    </div>
                </div>
                
                {/* Main Content Below Banner - Wrapped back in mainCont to stay centered */}
                <div className="mainCont" style={{ marginTop: '40px' }}>
                    <div className="boxCrd">
                        <h3 style={{margin: '0 0 15px 0'}}>Why use our platform?</h3>
                          <ul style={{lineHeight: '1.8', color: '#555', paddingLeft: '20px'}}>
                            <li>Save on daily commute expenses with dynamic fare splits</li>
                              <li>Travel securely with verified campus students and Captains</li>
                            <li>Live tracking and proximity matching</li>
                        </ul>
                          <Link to="/rides"><button style={{marginTop: '20px'}}>Explore Rides Now</button></Link>
                    </div>
                </div>
            </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/rides" element={<AllRds />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dash /></ProtectedRoute>} />
        <Route path="/ride/:id" element={<ProtectedRoute><RdDets /></ProtectedRoute>} />
        <Route path="/post-ride" element={<ProtectedRoute><PstRd /></ProtectedRoute>} />
        <Route path="/my-books" element={<ProtectedRoute><MyBks /></ProtectedRoute>} />
        <Route path="/req-ride" element={<ProtectedRoute><RqRd /></ProtectedRoute>} />
        <Route path="/profile/:nm" element={<ProtectedRoute><UsrProf /></ProtectedRoute>} />
        <Route path="/become-captain" element={<ProtectedRoute><CaptReg /></ProtectedRoute>} />
        <Route path="/my-profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
        
        {/* Admin Route */}
        <Route path="/admin" element={<ProtectedRoute reqRole="admin"><AdminDash /></ProtectedRoute>} />
        
      </Routes>
    </BrowserRouter>
  );
}