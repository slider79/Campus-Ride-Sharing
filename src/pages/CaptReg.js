import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reqCapt } from '../slices/userSlice';

// A dedicated portal for drivers to upload vehicle details and images
export default function CaptReg() {
    const [veh, setVeh] = React.useState('');
    const [plate, setPlate] = React.useState('');
    const [color, setColor] = React.useState('');
    const [idPic, setIdPic] = React.useState('');
    const [licPic, setLicPic] = React.useState('');
    
    const dsp = useDispatch();
    const cUsr = useSelector(s => s.usr.currUsr);

    // Helper function to convert uploaded images to Base64 strings for Redux
    const handleFileUpload = (e, setFileState) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFileState(reader.result); // This saves the image as a readable string
            };
            reader.readAsDataURL(file);
        }
    }

    const subCapt = (e) => {
        e.preventDefault();
        
        if(!idPic || !licPic) {
            return alert("Please upload both your Student ID and Driver's License.");
        }
        
        dsp(reqCapt({veh, plate, color, idPic, licPic}));
        alert("Application and documents sent to Admin! Please wait for approval.");
    }

    if(cUsr?.isCapt) return <div className="mainCont">You are already an approved Captain.</div>;
    if(cUsr?.captPending) return <div className="mainCont">Your application is pending. Please wait for the admin to review your documents.</div>;

    return (
        <div className="mainCont boxCrd">
            <div className="bigText">Become a Captain</div>
            <p className="smText" style={{marginBottom: '20px'}}>Manual approval required. Please upload clear images of your documents.</p>
            
            <form onSubmit={subCapt}>
                <input placeholder="Vehicle Details (make, model, variant)" value={veh} onChange={e=>setVeh(e.target.value)} required />
                <input placeholder="Number Plate (e.g. LEA-1234)" value={plate} onChange={e=>setPlate(e.target.value)} required />
                <input placeholder="Color" value={color} onChange={e=>setColor(e.target.value)} required />
                
                <div style={{marginTop: '15px', marginBottom: '5px'}} className="smText"><strong>Upload Student ID Card:</strong></div>
                <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, setIdPic)} required />
                
                <div style={{marginTop: '15px', marginBottom: '5px'}} className="smText"><strong>Upload Driver's License:</strong></div>
                <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, setLicPic)} required />

                <button type="submit" style={{marginTop: '25px'}}>Submit Application</button>
            </form>
        </div>
    )
}