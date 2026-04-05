import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { aprCapt } from '../slices/userSlice';

// Admin interface to review driver applications and their uploaded documents
export default function AdminDash() {
    const uList = useSelector(s => s.usr.usrList);
    const dsp = useDispatch();
    
    // filter to only show users who have a pending captain request
    const pends = uList.filter(u => u.captPending === true);

    const aprvBtn = (eml) => {
        dsp(aprCapt(eml));
        alert("Captain approved successfully!");
    }

    return (
        <div className="mainCont">
            <div className="bigText">Admin Approval Dashboard</div>
            {pends.length === 0 ? <p>No pending Captain applications right now.</p> : null}
            
            {pends.map((u, i) => (
                <div key={i} className="boxCrd">
                    <p><strong>Name:</strong> {u.nm} | <strong>Email:</strong> {u.eml}</p>
                    <p><strong>Roll No:</strong> {u.roll} | <strong>Degree:</strong> {u.deg}</p>
                    
                    <hr style={{margin: '10px 0', border: '0.5px solid #eaeaea'}} />
                    
                    <p><strong>Vehicle:</strong> {u.vehDeets}</p>
                    <p><strong>Color:</strong> {u.color} | <strong>Number Plate:</strong> {u.plate}</p>
                    
                    <hr style={{margin: '15px 0', border: '0.5px solid #eaeaea'}} />
                    
                    {/* Display the uploaded images side by side */}
                    <div style={{display: 'flex', gap: '20px', marginTop: '10px', flexWrap: 'wrap'}}>
                        <div>
                            <div className="smText" style={{marginBottom: '5px'}}>Student ID:</div>
                            {u.idPic ? (
                                <img src={u.idPic} alt="Student ID" style={{height: '120px', borderRadius: '4px', border: '1px solid #ccc', objectFit: 'cover'}} />
                            ) : 'No image provided'}
                        </div>
                        
                        <div>
                            <div className="smText" style={{marginBottom: '5px'}}>Driver's License:</div>
                            {u.licPic ? (
                                <img src={u.licPic} alt="License" style={{height: '120px', borderRadius: '4px', border: '1px solid #ccc', objectFit: 'cover'}} />
                            ) : 'No image provided'}
                        </div>
                    </div>

                    <button style={{marginTop: '20px', width: '100%'}} onClick={() => aprvBtn(u.eml)}>Approve Captain</button>
                </div>
            ))}
        </div>
    )
}