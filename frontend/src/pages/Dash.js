import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRides, fetchAllRequests, completeRide } from '../slices/rideSlice';

// dashboard ka nizam, kon kahan ja rha hai sab yahan hai
export default function Dash() 
{
    const cUsr = useSelector(s => s.usr.currUsr);
    const token = useSelector(s => s.usr.token);
      const rList = useSelector(s => s.rd.rdList);
    const reqList = useSelector(s => s.rd.reqRds);
    const dsp = useDispatch();
  const [tab, setTab] = React.useState('posted'); // dashboard tabs

  React.useEffect(() => {
    dsp(fetchRides());
    dsp(fetchAllRequests());
  }, [dsp]);

    const myPosts = rList.filter(r => {
      const captainId = typeof r?.captainId === 'string' ? r.captainId : r?.captainId?._id;
      return captainId === cUsr?._id || r?.dNm === cUsr?.userName;
    });
      const myReqs = reqList.filter(r => {
        const requestUserId = typeof r?.userId === 'string' ? r.userId : r?.userId?._id;
        return requestUserId === cUsr?._id;
      });

      const hndlEnd = async (id) => {
        try {
          await dsp(completeRide({ rideId: id, token })).unwrap();
          alert("Ride marked as completed!");
        } catch (error) {
          alert(error || 'Could not mark ride completed.');
        }
    }

    return(
        <div className="mainCont">
            <div className="bigText">Dashboard</div>
              <p className="smText">Welcome back, {cUsr?.userName} ({cUsr?.roll})</p>
            
            <div style={{display: 'flex', gap: '10px', marginBottom: '20px'}}>
               <button className={tab === 'posted' ? '' : 'btn-sec'} onClick={()=>setTab('posted')}>My Posted Rides</button>
                 <button className={tab === 'req' ? '' : 'btn-sec'} onClick={()=>setTab('req')}>My Requested Rides</button>
            </div>

            {tab === 'posted' && 
            (
                <div>
                    {myPosts.length === 0 ? <p>Tumnay koi gari nahi nikali abhi tak.</p> : null}
                      {myPosts.map((r, i) => 
                    (
                        <div key={i} className="boxCrd" style={{ opacity: r.actv ? 1 : 0.6 }}>
                            <strong>{r.pick} to {r.dest}</strong>
                              <div className="smText">Time: {r.dTime} | Seats left: {r.avlSts}</div>
                              <div className="smText" style={{color: r.actv ? 'green' : 'red', fontWeight: 'bold'}}>
                                  Status: {r.actv ? 'Active' : 'Completed'}
                              </div>
                              {r.actv && (
                                  <button className="btn-sec" style={{marginTop: '10px', fontSize: '12px', padding: '6px 12px'}} onClick={() => hndlEnd(r.rId)}>
                                      Mark as Completed
                                  </button>
                              )}
                        </div>
                    ))}
                </div>
            )}

            {tab === 'req' && 
            (
                <div>
                    {myReqs.length === 0 ? <p>Koi lift nahi mangi filhal.</p> : null}
                      {myReqs.map((r, i) => 
                    (
                        <div key={i} className="boxCrd">
                          <strong>{(r.pick || r.location || 'Unknown')} to {(r.dest || 'FAST NUCES')}</strong>
                          <div className="smText">Requested: {r.createdAt ? new Date(r.createdAt).toLocaleString() : 'Just now'}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}