import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addRd } from '../slices/rideSlice';
import { lahoreLocs } from '../constants';

// nai ride post karne ka scene, sawari full karo
export default function PstRd() 
{
  const [pick, setPick] = React.useState(lahoreLocs[0]);
    const [dest, setDest] = React.useState(lahoreLocs[3]);
  const [dTime, setDTime] = React.useState('');
  const [avlSts, setAvlSts] = React.useState('');
    const [veh, setVeh] = React.useState('');
  const [cnt, setCnt] = React.useState('');
    const [nts, setNts] = React.useState('');
  
  const dsp = useDispatch();
  const cUsr = useSelector(s => s.usr.currUsr);
    const nav = useNavigate();

  const hndlPst = (e) => 
    {
    e.preventDefault();
      const seatsNum = parseInt(avlSts);
    
    if(seatsNum < 1 || seatsNum > 7) return alert("Seats 1 se 7 ke beech me rakho");
      if(pick === dest) return alert("Pickup aur Drop location same nahi ho sakti stupid.");
    
    // FAST campus route validation
      if(pick !== "FAST NUCES" && dest !== "FAST NUCES") 
    {
        return alert("Bhai ye FAST ki app hai, ek location toh FAST honi chahiye");
    }
    
    // Number format validation
    if(!/^03\d{9}$/.test(cnt)) 
    {
        return alert("Phone number format galat hai. 11 digits honay chahiye aur '03' se shuru ho.");
    }

      dsp(addRd({
      dNm: cUsr.nm, pick, dest, dTime, avlSts: seatsNum, veh, cnt, nts
    }));
      nav('/rides');
  }

  return (
    <div className="mainCont boxCrd">
      <div className="bigText">Offer a Ride</div>
        <form onSubmit={hndlPst}>
        <div className="smText">Pickup Location</div>
          <select value={pick} onChange={e=>setPick(e.target.value)}>
          {lahoreLocs.map((l, i) => <option key={i} value={l}>{l}</option>)}
        </select>

        <div className="smText">Destination</div>
          <select value={dest} onChange={e=>setDest(e.target.value)}>
          {lahoreLocs.map((l, i) => <option key={i} value={l}>{l}</option>)}
        </select>

        <input type="datetime-local" required value={dTime} onChange={e=>setDTime(e.target.value)} />
          <input type="number" placeholder="Available Seats (1-7)" required value={avlSts} onChange={e=>setAvlSts(e.target.value)} />
        <input placeholder="Vehicle Type (e.g. Mehran)" required value={veh} onChange={e=>setVeh(e.target.value)} />
          <input placeholder="Contact Number (03xxxxxxxxx)" required value={cnt} onChange={e=>setCnt(e.target.value)} />
        <textarea placeholder="Any notes?" value={nts} onChange={e=>setNts(e.target.value)}></textarea>
        <button type="submit">Post Ride</button>
      </form>
    </div>
  )
}