import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// dashboard ka nizam, kon kahan ja rha hai sab yahan hai
export default function Dash() 
{
    const cUsr = useSelector(s => s.usr.currUsr);
      const rList = useSelector(s => s.rd.rdList);
    const reqList = useSelector(s => s.rd.reqRds);
  const [tab, setTab] = React.useState('posted'); // dashboard tabs
    const dsp = useDispatch();

    const myPosts = rList.filter(r => r.dNm === cUsr?.nm);
      const myReqs = reqList.filter(r => r.nm === cUsr?.nm);

    const hndlEnd = (id) => {
        // ride end maro taakay board se hat jaye (frontend only for now)
        alert("Ride marked as completed!");
    }

    return(
        <div className="mainCont">
            <div className="bigText">Dashboard</div>
              <p className="smText">Welcome back, {cUsr?.nm} ({cUsr?.roll})</p>
            
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
                            <strong>Looking for a ride: {r.pick} to {r.dest}</strong>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}