import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { bkSeat, sndMsg } from '../slices/rideSlice';

export default function RdDets() 
{
  const { id } = useParams();
  const rList = useSelector(s => s.rd.rdList);
  // Filtering chats specific to this exact ride
  const chats = useSelector(s => s.rd.chats.filter(c => c.rId === id)); 
  const cUsr = useSelector(s => s.usr.currUsr);
  const dsp = useDispatch();
  const nav = useNavigate();
  
  const [msg, setMsg] = React.useState('');

  const rObj = rList.find(x => x.rId === id);

  const bkSeatBtn = () => 
  {
    if(!cUsr) {
        alert("Login required bro");
        nav('/login');
        return;
    }
    dsp(bkSeat({rId: id, uEml: cUsr.eml, pick: rObj.pick, dest: rObj.dest}));
    alert("Seat booked successfully!");
  }

  // Handle sending chat messages
  const sndChat = (e) => {
      e.preventDefault();
      if(!cUsr) return alert("You need to be logged in to chat.");
      if(!msg.trim()) return; // Prevent empty messages
      
      dsp(sndMsg({rId: id, sndr: cUsr.nm, txt: msg}));
      setMsg('');
  }

  if(!rObj) return <div className="mainCont">Ride not found...</div>;

  // Dynamic Fare Calculation Engine (From Proposal)
  // Assuming a demo distance of 10km for front-end purposes
  const distKm = 10; 
  const baseFare = 50;
  let totFare = baseFare + (distKm * 25);
  
  // Split fare logic: divides total by number of active passengers (minimum 1)
  const activePass = rObj.passngrs || 1;
  if (rObj.passngrs > 0) {
      totFare = totFare / activePass;
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
      
      {/* Dynamic Fare UI */}
      <div style={{background: '#f5f5f5', padding: '12px', borderRadius: '4px', margin: '15px 0', borderLeft: '4px solid #111'}}>
          <strong>Estimated Fare: </strong> {totFare.toFixed(2)} PKR per head
          <div className="smText" style={{marginTop: '4px'}}>
              (Based on {distKm}km demo distance and {activePass} active passengers)
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