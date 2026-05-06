import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { bookSeat, sndMsg } from '../slices/rideSlice';

export default function RdDets() 
{
  const { id } = useParams();
  const rList = useSelector(s => s.rd.rdList);
  // Filtering chats specific to this exact ride
  const chats = useSelector(s => s.rd.chats.filter(c => c.rId === id)); 
  const cUsr = useSelector(s => s.usr.currUsr);
  const token = useSelector((s) => s.usr.token);
  const dsp = useDispatch();
  const nav = useNavigate();
  
  const [msg, setMsg] = React.useState('');

  const rObj = rList.find(x => x.rId === id);

  const bkSeatBtn = async () => 
  {
    if(!cUsr) {
        alert("Login required bro");
        nav('/login');
        return;
    }
    try {
      await dsp(bookSeat({ rideId: id, token })).unwrap();
      alert("Seat booked successfully!");
    } catch (err) {
      alert(err || 'Booking failed.');
    }
  }

  // Handle sending chat messages
  const sndChat = (e) => {
      e.preventDefault();
      if(!cUsr) return alert("You need to be logged in to chat.");
      if(!msg.trim()) return; // Prevent empty messages
      
      dsp(sndMsg({rId: id, sndr: cUsr.userName, txt: msg}));
      setMsg('');
  }

  // Calculate actual fare based on ride data
  const distKm = rObj.distanceKm || 10; // Default to 10km if not available
  const baseFare = rObj.baseFare || 50;
  const distanceCharge = Math.round(distKm * (rObj.ratePerKm || 25) * 100) / 100;
  const farePerSeat = rObj.farePerSeat || (baseFare + distanceCharge);
  
  // Split fare logic: divides total by number of active passengers
  let perPassengerFare = farePerSeat;
  const activePass = rObj.passngrs || 1;
  if (rObj.passngrs > 0) {
    perPassengerFare = Math.round((rObj.totalFareAllSeats / activePass) * 100) / 100;
  }

  return (
    <div className="mainCont boxCrd">
      <div className="bigText">Ride Details</div>
      <p><strong>Captain:</strong> <Link to={`/profile/${rObj.dNm}`}>{rObj.dNm}</Link></p>
      <p><strong>From:</strong> {rObj.pick}</p>
      <p><strong>To:</strong> {rObj.dest}</p>
      <p><strong>Departure:</strong> {rObj.dTime}</p>
      <p><strong>Vehicle:</strong> {rObj.veh}</p>
      <p><strong>Seats Left:</strong> {rObj.avlSts}</p>
      <p><strong>Contact:</strong> {rObj.cnt}</p>
      <p className="smText">Notes: {rObj.nts}</p>
      
      {/* Detailed Fare Breakdown */}
      <div style={{background: '#e8f5e9', padding: '15px', borderRadius: '6px', margin: '15px 0', border: '2px solid #4caf50'}}>
        <div className="bigText" style={{fontSize: '18px', marginBottom: '10px'}}>💰 Fare Breakdown</div>
        <div className="smText">
          <p><strong>Distance:</strong> {distKm} km</p>
          <p><strong>Base Fare:</strong> PKR {baseFare} per passenger</p>
          <p><strong>Distance Charge:</strong> PKR {distanceCharge} per passenger (PKR {Math.round(((rObj.ratePerKm || 25)) * 100) / 100}/km × {distKm}km)</p>
          <hr style={{border: '0.5px solid #999', margin: '8px 0'}} />
          <p><strong>Per Seat Price:</strong> PKR {farePerSeat}</p>
          <p><strong>Total for Available Seats:</strong> PKR {rObj.totalFareAllSeats || (farePerSeat * (rObj.avlSts || 1))} ({rObj.avlSts} seats)</p>
          {activePass > 0 && <p><strong style={{color: '#2e7d32'}}>Per Passenger Cost:</strong> PKR {perPassengerFare} ({activePass} passengers)</p>}
        </div>
      </div>
      
      <button onClick={bkSeatBtn} disabled={rObj.avlSts === 0} style={{marginBottom: '30px'}}>
        {rObj.avlSts === 0 ? "House Full" : "Book Seat"}
      </button>

      <hr style={{border: '0.5px solid #eaeaea', marginBottom: '20px'}}/>

      {/* Real-time Chat Module */}
      <div className="bigText" style={{fontSize: '20px'}}>Live Ride Chat</div>
      <p className="smText">Coordinate exact pickup spots or notify about delays here.</p>
      
      <div style={{height: '200px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px', marginBottom: '15px', borderRadius: '4px', background: '#fafafa'}}>
        {chats.length === 0 ? <p className="smText" style={{textAlign: 'center', marginTop: '80px'}}>No messages yet. Say hi!</p> : null}
        {chats.map((c, i) => (
          <div key={i} style={{marginBottom: '8px', padding: '8px', background: c.sndr === cUsr?.nm ? '#e3f2fd' : '#fff', borderRadius: '4px', border: '1px solid #eee'}}>
            <strong>{c.sndr}:</strong> {c.txt}
          </div>
        ))}
      </div>

      <form style={{display: 'flex', gap: '10px'}} onSubmit={sndChat}>
        <input style={{marginBottom: 0}} placeholder="Type a message..." value={msg} onChange={e=>setMsg(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}