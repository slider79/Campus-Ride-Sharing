import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { doOut } from './slices/userSlice';

// navbar ka nizam
export default function Nav() 
{
  const cUsr = useSelector(s => s.usr.currUsr);
    const dsp = useDispatch();
  const nav = useNavigate();

  const hndlOut = () => 
    {
    dsp(doOut());
      nav('/login');
  }

  return (
    <div className="navBar">
      <Link to="/">Home</Link>
        <Link to="/rides">All Rides</Link>
      {!cUsr && <Link to="/login">Login</Link>}
        {!cUsr && <Link to="/register">Register</Link>}
      {cUsr && 
      (
        <>
          <Link to="/dashboard">Dashboard</Link>
          
          {/* agar banda captain hai to hi ride post karay ga */}
          {cUsr?.isCapt && <Link to="/post-ride">Post Ride</Link>}
          
          {/* Admin k ilawa har koi lift mang sakta hai, even captains */}
          {cUsr?.role !== 'admin' && <Link to="/req-ride">Request Ride</Link>}
          
          <Link to="/my-books">My Bookings</Link>
          
          {/* admin and captain logic */}
          {cUsr?.role === 'admin' && <Link to="/admin">Admin Dash</Link>}
          {cUsr?.role === 'passenger' && !cUsr?.isCapt && <Link to="/become-captain">Be a Captain</Link>}
          
            <Link to="/chg-pwd">Change Pwd</Link>
          <button className="btn-sec" style={{padding: '4px 10px'}} onClick={hndlOut}>Logout</button>
        </>
      )}
    </div>
  )
}