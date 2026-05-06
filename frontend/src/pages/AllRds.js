import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRides, fetchAllRequests } from '../slices/rideSlice';

// sari gariyan idhar khari hain, filter shilter maar lo
export default function AllRds() 
{
  const dsp = useDispatch();
  const rList = useSelector(s => s.rd.rdList);
    const reqList = useSelector(s => s.rd.reqRds);
  const [sPrm, setSPrm] = useSearchParams();
  const qry = sPrm.get('search') || '';
    const [tab, setTab] = React.useState('offers'); // offers vs requests tab

  React.useEffect(() => {
    dsp(fetchRides());
    dsp(fetchAllRequests());
  }, [dsp]);

  const srchEvt = (e) => setSPrm({search: e.target.value});

    // sirf active rides filter karo
    const fList = rList.filter(r => {
      const dest = (r?.dest || '').toLowerCase();
      const pick = (r?.pick || '').toLowerCase();
      const q = qry.toLowerCase();
      return r?.actv === true && (dest.includes(q) || pick.includes(q));
    });

  const fReqList = reqList.filter(r => {
    const loc = (r?.location || '').toLowerCase();
    return loc.includes(qry.toLowerCase());
  });

  return (
    <div className="mainCont">
      <div className="bigText">Campus Transportation</div>
        <input placeholder="Search by destination or pickup location..." value={qry} onChange={srchEvt} />
      
      <div style={{display: 'flex', gap: '10px', marginBottom: '20px'}}>
        <button className={tab === 'offers' ? '' : 'btn-sec'} onClick={()=>setTab('offers')}>Ride Offers</button>
          <button className={tab === 'reqs' ? '' : 'btn-sec'} onClick={()=>setTab('reqs')}>Ride Requests</button>
      </div>

      {tab === 'offers' && fList.map(rd => 
      (
        <div key={rd.rId} className="boxCrd" style={{ position: 'relative' }}>
          {rd.avlSts === 0 && 
          (
            <span style={{ position: 'absolute', top: '15px', right: '15px', background: '#111', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>
              House Full
            </span>
          )}
            <div style={{fontWeight: 'bold', marginBottom: '8px'}}>{rd.pick} to {rd.dest}</div>
          <div className="smText">Time: {rd.dTime} | Seats: {rd.avlSts} | By: {rd.dNm}</div>
            <Link to={`/ride/${rd.rId}`}><button className="btn-sec" style={{marginTop: '10px'}}>View Details</button></Link>
        </div>
      ))}

        {tab === 'reqs' && fReqList.map((req, i) => 
      (
          <div key={i} className="boxCrd">
              <div style={{fontWeight: 'bold', marginBottom: '8px'}}>{(req.pick || req.location || 'Unknown')} to {(req.dest || 'FAST NUCES')}</div>
            <div className="smText">Requested: {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : 'Just now'}</div>
          </div>
      ))}
    </div>
  )
}