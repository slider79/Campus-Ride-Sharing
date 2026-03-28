import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reqRd } from '../slices/rideSlice';
import { lahoreLocs } from '../constants';

// paidal chalne se behtar hai lift mang lo
export default function RqRd() 
{
    const [pick, setPick] = React.useState(lahoreLocs[0]);
  const [dest, setDest] = React.useState(lahoreLocs[2]);
    const dsp = useDispatch();
      const cUsr = useSelector(s => s.usr.currUsr);
    const nav = useNavigate();

    const subReq = (e) => 
    {
        e.preventDefault();

        if(pick === dest) return alert("Bhai jahan kharay ho wahin ka drop mang rhay ho?");
          if(pick !== "FAST NUCES" && dest !== "FAST NUCES") return alert("Ek location FAST NUCES lazmi honi chahiye!");
        
        dsp(reqRd({nm: cUsr.nm, pick, dest}));
          alert("Request posted!");
        nav('/rides');
    }

    return (
        <div className="mainCont boxCrd">
            <div className="bigText">Request a Ride</div>
              <form onSubmit={subReq}>
               <div className="smText">From where?</div>
                 <select value={pick} onChange={e=>setPick(e.target.value)}>
                  {lahoreLocs.map((l, i) => <option key={i} value={l}>{l}</option>)}
               </select>

               <div className="smText">To where?</div>
                 <select value={dest} onChange={e=>setDest(e.target.value)}>
                  {lahoreLocs.map((l, i) => <option key={i} value={l}>{l}</option>)}
               </select>

               <button type="submit">Submit Request</button>
            </form>
        </div>
    )
}