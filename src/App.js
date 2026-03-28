import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './styles.css';

// Importing all the pages we just split up
import Nav from './Nav';
import Login from './pages/Login';
import Register from './pages/Register';
import Dash from './pages/Dash';
import AllRds from './pages/AllRds';
import RdDets from './pages/RdDets';
import PstRd from './pages/PstRd';
import MyBks from './pages/MyBks';
import RqRd from './pages/RqRd';
import UsrProf from './pages/UsrProf';
import ChgPwd from './pages/ChgPwd';

// main app component, bismillah parh k shuru karo
export default function App() 
{
  return (
    <BrowserRouter>
      <Nav />
        <Routes>
        <Route path="/" element=
        {
            <div className="mainCont">
                <div className="bigText">FAST Rideshare</div>
                  <p className="smText" style={{fontSize: '16px'}}>The carpooling platform for FASTians by FASTians.</p>
                
                <div className="boxCrd" style={{marginTop: '30px'}}>
                    <h3 style={{margin: '0 0 15px 0'}}>Why use our platform?</h3>
                      <ul style={{lineHeight: '1.8', color: '#555', paddingLeft: '20px'}}>
                        <li>Save on daily commute expenses</li>
                          <li>Travel securely with verified campus students</li>
                        <li>Help reduce campus parking traffic</li>
                    </ul>
                      <Link to="/rides"><button style={{marginTop: '20px'}}>Explore Rides Now</button></Link>
                </div>
            </div>
        } />
          <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dash />} />
        <Route path="/rides" element={<AllRds />} />
          <Route path="/ride/:id" element={<RdDets />} />
        <Route path="/post-ride" element={<PstRd />} />
          <Route path="/my-books" element={<MyBks />} />
        <Route path="/req-ride" element={<RqRd />} />
          <Route path="/profile/:nm" element={<UsrProf />} />
        <Route path="/chg-pwd" element={<ChgPwd />} />
      </Routes>
    </BrowserRouter>
  );
}