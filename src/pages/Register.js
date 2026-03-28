import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { regUsr } from '../slices/userSlice';
import { degrees } from '../constants';

// naya larka in horha hai system me, reg form
export default function Register() 
{
  const [nm, setNm] = React.useState('');
  const [eml, setEml] = React.useState('');
    const [pwd, setPwd] = React.useState('');
  const [roll, setRoll] = React.useState('');
  const [deg, setDeg] = React.useState(degrees[0]);
    const dsp = useDispatch();
  const nav = useNavigate();

  const subReg = (e) =>
    {
      e.preventDefault();
      
      // full strict checking with uni details b asically checks hi hain
      if(!/^[a-zA-Z\s]+$/.test(nm)) return alert("Naam mein numbers kaun dalta hai?");
        if(!/\S+@\S+\.\S+/.test(eml)) return alert("Invalid email format ustaad.");
      if(pwd.length < 5) return alert("Password thora lamba rakho (5+ chars).");
      
      // strict roll number check XXL-XXXX
        if(!/^\d{2}[lL]-\d{4}$/.test(roll)) return alert("Roll number ka format XXL-XXXX hona chahye");

      dsp(regUsr({nm, eml, pwd, roll: roll.toUpperCase(), deg}));
        alert("Account registered! Now please Login.");
      nav('/login');
  }

  return(
    <div className="mainCont boxCrd">
      <div className="bigText">Register Account</div>
      <form onSubmit={subReg}>
          <input placeholder="Full Name (Letters only)" value={nm} onChange={e=>setNm(e.target.value)} />
        <input placeholder="Email" value={eml} onChange={e=>setEml(e.target.value)} />
          <input placeholder="Roll Number (e.g. 21L-1234)" value={roll} onChange={e=>setRoll(e.target.value)} />
        
        <div className="smText">Degree Program</div>
          <select value={deg} onChange={e=>setDeg(e.target.value)} style={{marginBottom: '16px'}}>
          {degrees.map(d => <option key={d} value={d}>{d}</option>)}
        </select>

        <input type="password" placeholder="Password (Min 5 chars)" value={pwd} onChange={e=>setPwd(e.target.value)} />
          <button type="submit">Register</button>
      </form>
    </div>
  )
}