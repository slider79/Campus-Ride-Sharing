import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

// driver bhai ki profile, FAST ka launda hai ya nai
export default function UsrProf() 
{
    const { nm } = useParams();
      const usrList = useSelector(s => s.usr.usrList);
    const rList = useSelector(s => s.rd.rdList);
    
    const prof = usrList.find(u => u.nm === nm);
      const totRides = rList.filter(r => r.dNm === nm).length;

    if(!prof) return <div className="mainCont">User record not found.</div>;

    return (
        <div className="mainCont boxCrd">
            <div className="bigText">Student Profile</div>
              <p><strong>Name:</strong> {prof.nm}</p>
            <p><strong>Roll Number:</strong> {prof.roll}</p>
              <p><strong>Degree:</strong> {prof.deg}</p>
            <p><strong>Total Rides Posted:</strong> {totRides}</p>
            <p className="smText" style={{marginTop: '20px'}}>FAST NUCES verified student commuter.</p>
        </div>
    )
}