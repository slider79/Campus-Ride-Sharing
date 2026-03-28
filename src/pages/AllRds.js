import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

// sari gariyan idhar khari hain, filter shilter maar lo
export default function AllRds() 
{
  const rList = useSelector(s => s.rd.rdList);
    const reqList = useSelector(s => s.rd.reqRds);
  const [sPrm, setSPrm] = useSearchParams();
  const qry = sPrm.get('search') || '';
    const [tab, setTab] = React.useState('offers'); // offers vs requests tab

  const srchEvt = (e) => setSPrm({search: e.target.value});

    const fList = rList.filter(r => r.dest.toLowerCase().includes(qry.toLowerCase()) || r.pick.toLowerCase().includes(qry.toLowerCase()));
  const fReqList = reqList.filter(r => r.dest.toLowerCase().includes(qry.toLowerCase()) || r.pick.toLowerCase().includes(qry.toLowerCase()));

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
              <div style={{fontWeight: 'bold', marginBottom: '8px'}}>Needs ride: {req.pick} to {req.dest}</div>
                <div className="smText">Requested by: <Link to={`/profile/${req.nm}`}>{req.nm}</Link></div>
          </div>
      ))}
    </div>
  )
}