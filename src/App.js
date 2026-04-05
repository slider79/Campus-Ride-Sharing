import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './styles.css';

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
import MyProfile from './pages/MyProfile'; // New import
import AdminDash from './pages/AdminDash';
import CaptReg from './pages/CaptReg';

export default function App() 
{
  return (
    <BrowserRouter>
      <Nav />
        <Routes>
        <Route path="/" element=
        {
            <div className="mainCont">
                <div className="bigText">On Your Way</div>
                  <p className="smText" style={{fontSize: '16px'}}>The carpooling platform for FASTians by FASTians.</p>
                
                <div className="boxCrd" style={{marginTop: '30px'}}>
                    <h3 style={{margin: '0 0 15px 0'}}>Why use our platform?</h3>
                      <ul style={{lineHeight: '1.8', color: '#555', paddingLeft: '20px'}}>
                        <li>Save on daily commute expenses with dynamic fare splits</li>
                          <li>Travel securely with verified campus students and Captains</li>
                        <li>Live tracking and proximity matching</li>
                    </ul>
                      <Link to="/rides"><button style={{marginTop: '20px'}}>Explore Rides Now</button></Link>
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
        
        {/* New Profile Route replacing chg-pwd */}
        <Route path="/my-profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
        
        <Route path="/admin" element={<ProtectedRoute reqRole="admin"><AdminDash /></ProtectedRoute>} />
        
      </Routes>
    </BrowserRouter>
  );
}