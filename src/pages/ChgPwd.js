import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { chgPwd, doOut } from '../slices/userSlice';

// password bhool gaye ya badalna hai, idhar aao
export default function ChgPwd() 
{
    const [nPwd, setNPwd] = React.useState('');
      const [cPwd, setCPwd] = React.useState(''); 
    const dsp = useDispatch();
  const nav = useNavigate();
    
    const updtPwd = (e) => {
        e.preventDefault();

        if(nPwd.length < 5) return alert("Gaana nai likhna but min 5 chars dalo.");
          if(nPwd !== cPwd) return alert("Dono passwords match nai ho rahay bhai.");
        
        dsp(chgPwd(nPwd));
          dsp(doOut());
        alert("Password changed successfully! Please login again.");
          nav('/login');
    }

    return (
        <div className="mainCont boxCrd">
             <div className="bigText">Change Password</div>
               <form onSubmit={updtPwd}>
                <input type="password" placeholder="Enter new password" value={nPwd} onChange={e=>setNPwd(e.target.value)} />
                  <input type="password" placeholder="Confirm new password" value={cPwd} onChange={e=>setCPwd(e.target.value)} />
                <button type="submit">Update & Logout</button>
             </form>
        </div>
    )
}