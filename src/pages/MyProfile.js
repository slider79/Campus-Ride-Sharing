import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { chgPwd, doOut, updtProf } from '../slices/userSlice';

// User's personal hub for stats, settings, and passwords
export default function MyProfile() 
{
    const cUsr = useSelector(s => s.usr.currUsr);
    const rList = useSelector(s => s.rd.rdList);
    const myBks = useSelector(s => s.rd.myBks);
    
    const dsp = useDispatch();
    const nav = useNavigate();

    // Stats calculations
    const ridesOffered = rList.filter(r => r.dNm === cUsr?.nm).length;
    const ridesCompleted = rList.filter(r => r.dNm === cUsr?.nm && r.actv === false).length;
    const ridesBooked = myBks.filter(b => b.uEml === cUsr?.eml).length;

    // Form states
    const [newName, setNewName] = React.useState(cUsr?.nm || '');
    const [nPwd, setNPwd] = React.useState('');
    const [cPwd, setCPwd] = React.useState(''); 

    // Handle Profile Update
    const hndlProfUpdt = (e) => {
        e.preventDefault();
        if(newName.trim().length < 3) return alert("Name must be at least 3 characters.");
        dsp(updtProf(newName));
        alert("Profile name updated successfully!");
    }
    
    // Handle Password Change
    const updtPwd = (e) => {
        e.preventDefault();
        if(nPwd.length < 5) return alert("Password must be min 5 characters.");
        if(nPwd !== cPwd) return alert("Passwords do not match.");
        
        dsp(chgPwd(nPwd));
        dsp(doOut());
        alert("Password changed successfully! Please login again.");
        nav('/login');
    }

    if(!cUsr) return <div className="mainCont">Please login first.</div>;

    return (
        <div className="mainCont">
             <div className="bigText">My Profile</div>
             <p className="smText">Manage your personal settings and view your activity stats.</p>

             {/* STATS SECTION */}
             <div style={{ display: 'flex', gap: '15px', marginTop: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
                 <div className="boxCrd" style={{ flex: 1, textAlign: 'center', margin: 0 }}>
                     <h2 style={{ margin: '0 0 10px 0', fontSize: '32px', color: '#333' }}>{ridesBooked}</h2>
                     <div className="smText">Seats Booked</div>
                 </div>
                 {cUsr.isCapt && (
                     <>
                         <div className="boxCrd" style={{ flex: 1, textAlign: 'center', margin: 0 }}>
                             <h2 style={{ margin: '0 0 10px 0', fontSize: '32px', color: '#333' }}>{ridesOffered}</h2>
                             <div className="smText">Rides Offered</div>
                         </div>
                         <div className="boxCrd" style={{ flex: 1, textAlign: 'center', margin: 0 }}>
                             <h2 style={{ margin: '0 0 10px 0', fontSize: '32px', color: '#333' }}>{ridesCompleted}</h2>
                             <div className="smText">Rides Completed</div>
                         </div>
                     </>
                 )}
             </div>

             <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                 {/* UPDATE DETAILS SECTION */}
                 <div className="boxCrd" style={{ flex: 1, minWidth: '300px' }}>
                    <div className="bigText" style={{ fontSize: '20px' }}>Account Details</div>
                    <form onSubmit={hndlProfUpdt}>
                        <div className="smText" style={{marginBottom: '5px'}}>Email (Unchangeable)</div>
                        <input value={cUsr.eml} disabled style={{ background: '#eee', cursor: 'not-allowed' }} />
                        
                        <div className="smText" style={{marginBottom: '5px'}}>Roll Number</div>
                        <input value={cUsr.roll || 'N/A'} disabled style={{ background: '#eee', cursor: 'not-allowed' }} />
                        
                        <div className="smText" style={{marginBottom: '5px'}}>Display Name</div>
                        <input placeholder="Update Username" value={newName} onChange={e=>setNewName(e.target.value)} required />
                        
                        <button type="submit">Update Profile</button>
                    </form>
                 </div>

                 {/* CHANGE PASSWORD SECTION */}
                 <div className="boxCrd" style={{ flex: 1, minWidth: '300px' }}>
                    <div className="bigText" style={{ fontSize: '20px' }}>Security Settings</div>
                    <form onSubmit={updtPwd}>
                        <div className="smText" style={{marginBottom: '5px'}}>New Password</div>
                        <input type="password" placeholder="Enter new password" value={nPwd} onChange={e=>setNPwd(e.target.value)} />
                        
                        <div className="smText" style={{marginBottom: '5px'}}>Confirm Password</div>
                        <input type="password" placeholder="Confirm new password" value={cPwd} onChange={e=>setCPwd(e.target.value)} />
                        
                        <button type="submit" style={{ background: '#d32f2f' }}>Update & Logout</button>
                    </form>
                 </div>
             </div>
        </div>
    )
}