import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllUsers, approveCaptain } from '../slices/userSlice';

export default function AdminDash() {
  const dsp = useDispatch();
  
  // Pull current user, their token, and the full list of users from Redux
  const cUsr = useSelector(s => s.usr.currUsr);
  const token = useSelector(s => s.usr.token);
  const allUsers = useSelector(s => s.usr.usrList) || []; 
  
  // Page load hotay hi db se saare users kheench lo
  useEffect(() => {
    // Sirf tabhi fetch karo agar user logged in hai aur uski role 'admin' hai
    if (token && cUsr?.role === 'admin') {
      dsp(fetchAllUsers(token));
    }
  }, [dsp, token, cUsr]);

  // Agar koi aam user is page pe aane ki koshish kare, laat maro
  if (!cUsr || cUsr.role !== 'admin') {
    return (
      <div className="mainCont boxCrd">
        <p>Access Denied. Tu admin nahi hai dost, wapasi ka rasta pakro.</p>
      </div>
    );
  }

  // Database me se sirf wo users filter karo jinki captPending true hai
  const pndng = allUsers.filter(u => u.captPending === true);

  const hndlApr = (userId) => {
    // Approve api call using thunk
    dsp(approveCaptain({ userId, token }))
      .unwrap()
      .then(() => alert("Captain Approved! 😎 Road pe aane ki ijazat mil gayi."))
      .catch((err) => alert("Masla: " + err));
  };

  return (
    <div className="mainCont boxCrd">
      <div className="bigText">Admin Boss Dashboard</div>
      <p style={{ marginBottom: '20px', color: '#555' }}>Pending Captain Requests:</p>
      
      {/* Agar list khali hai tou yeh dikhao */}
      {pndng.length === 0 ? (
        <p style={{ color: 'green', fontWeight: 'bold' }}>Sari files clear hain, koi request pending nahi.</p>
      ) : (
        /* Warna loop mar ke har pending user ka card banao */
        pndng.map((u) => (
          <div key={u._id} style={{ 
            border: '1px solid #ddd', 
            padding: '15px', 
            marginBottom: '15px', 
            borderRadius: '8px',
            backgroundColor: '#f9f9f9'
          }}>
            <p style={{ margin: '5px 0' }}><strong>Name:</strong> {u.userName}</p>
            <p style={{ margin: '5px 0' }}><strong>Email:</strong> {u.email}</p>
            <p style={{ margin: '5px 0' }}><strong>Roll/Degree:</strong> {u.roll} - {u.degree}</p>
            <hr style={{ borderTop: '1px dashed #ccc', margin: '10px 0' }} />
            <p style={{ margin: '5px 0' }}><strong>Vehicle:</strong> {u.vehDeets} ({u.color})</p>
            <p style={{ margin: '5px 0' }}><strong>Plate:</strong> <span style={{ background: '#eee', padding: '2px 6px', border: '1px solid #aaa', fontWeight: 'bold' }}>{u.plate}</span></p>
            
            <button 
              onClick={() => hndlApr(u._id)} 
              style={{ 
                marginTop: '15px', 
                backgroundColor: '#28a745', 
                color: 'white', 
                padding: '8px 16px', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Approve Captain
            </button>
          </div>
        ))
      )}
    </div>
  );
}