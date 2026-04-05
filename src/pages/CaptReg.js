import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reqCapt } from '../slices/userSlice';

// A dedicated portal for drivers to upload vehicle details and student IDs[cite: 2]
export default function CaptReg() {
    const [veh, setVeh] = React.useState('');
    const [idPic, setIdPic] = React.useState('');
    const dsp = useDispatch();
    const cUsr = useSelector(s => s.usr.currUsr);

    const subCapt = (e) => {
        e.preventDefault();
        dsp(reqCapt({veh, idPic}));
        alert("Application sent to Admin Boss. Wait for approval!");
    }

    if(cUsr?.isCapt) return <div className="mainCont">Ustad ap pehlay hi Captain ho.</div>;
    if(cUsr?.captPending) return <div className="mainCont">Application pending hai, sabar karo thora.</div>;

    return (
        <div className="mainCont boxCrd">
            <div className="bigText">Become a Captain</div>
            <p className="smText">Manual approval required for secure onboarding[cite: 2].</p>
            <form onSubmit={subCapt}>
                <input placeholder="Vehicle Details (Make, Model, Color)" value={veh} onChange={e=>setVeh(e.target.value)} required />
                <input placeholder="Student ID Number / Image Link" value={idPic} onChange={e=>setIdPic(e.target.value)} required />
                <button type="submit">Apply for Captain</button>
            </form>
        </div>
    )
}