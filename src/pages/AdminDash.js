import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { aprCapt } from '../slices/userSlice';

// admin check karay ga k banda legit hai ya nai
export default function AdminDash() {
    const uList = useSelector(s => s.usr.usrList);
    const dsp = useDispatch();
    
    // filter unko karo jinki request aayi wi hai
    const pends = uList.filter(u => u.captPending === true);

    const aprvBtn = (eml) => {
        dsp(aprCapt(eml));
        alert("Driver approved! They can now list rides.");
    }

    return (
        <div className="mainCont">
            <div className="bigText">Admin Approval Dashboard</div>
            {pends.length === 0 ? <p>Koi naya driver nai aya boss.</p> : null}
            {pends.map((u, i) => (
                <div key={i} className="boxCrd">
                    <p><strong>Name:</strong> {u.nm} | <strong>Email:</strong> {u.eml}</p>
                    <p><strong>Roll No:</strong> {u.roll} | <strong>Degree:</strong> {u.deg}</p>
                    <hr style={{margin: '10px 0', border: '0.5px solid #eaeaea'}} />
                    <p><strong>Vehicle Details:</strong> {u.vehDeets}</p>
                    <p><strong>ID/License Proof:</strong> {u.idPic}</p>
                    <button style={{marginTop: '10px'}} onClick={() => aprvBtn(u.eml)}>Approve Captain</button>
                </div>
            ))}
        </div>
    )
}