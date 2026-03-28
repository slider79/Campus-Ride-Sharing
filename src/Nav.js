import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { doOut } from './slices/userSlice';

// navbar set krdi hai yahan, simple scene hai
export default function Nav() 
{
  const cUsr = useSelector(s => s.usr.currUsr);
    const dsp = useDispatch();
  const nav = useNavigate();

  const hndlOut = () => 
    {
    // dafa karo isko, session out
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
          <Link to="/post-ride">Post Ride</Link>
            <Link to="/req-ride">Request Ride</Link>
          <Link to="/my-books">My Bookings</Link>
            <Link to="/chg-pwd">Change Pwd</Link>
          <button className="btn-sec" style={{padding: '4px 10px'}} onClick={hndlOut}>Logout</button>
        </>
      )}
    </div>
  )
}