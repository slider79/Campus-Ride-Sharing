import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { bkSeat } from '../slices/rideSlice';

// gari ki poori history aur driver ka kacha chitha
export default function RdDets() 
{
  const { id } = useParams();
    const rList = useSelector(s => s.rd.rdList);
  const cUsr = useSelector(s => s.usr.currUsr);
  const dsp = useDispatch();
    const nav = useNavigate();
  
  const rObj = rList.find(x => x.rId === id);

  const bkSeatBtn = () => 
    {
    if(!cUsr) 
      {
        alert("Login required bro");
          nav('/login');
        return;
    }
      dsp(bkSeat({rId: id, uEml: cUsr.eml, pick: rObj.pick, dest: rObj.dest}));
    alert("Seat booked successfully!");
  }

    if(!rObj) return <div className="mainCont">Ride nai mili ustad...</div>;

  return (
    <div className="mainCont boxCrd">
      <div className="bigText">Ride Details</div>
        <p><strong>Driver:</strong> <Link to={`/profile/${rObj.dNm}`}>{rObj.dNm}</Link></p>
      <p><strong>From:</strong> {rObj.pick}</p>
        <p><strong>To:</strong> {rObj.dest}</p>
      <p><strong>Departure:</strong> {rObj.dTime}</p>
      <p><strong>Vehicle:</strong> {rObj.veh}</p>
        <p><strong>Seats Left:</strong> {rObj.avlSts}</p>
      <p><strong>Contact:</strong> {rObj.cnt}</p>
        <p className="smText">Notes: {rObj.nts}</p>
      
      <button onClick={bkSeatBtn} disabled={rObj.avlSts === 0}>
        {rObj.avlSts === 0 ? "House Full" : "Book Seat"}
      </button>
    </div>
  )
}