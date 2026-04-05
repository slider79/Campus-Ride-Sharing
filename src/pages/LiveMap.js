import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sndMsg } from '../slices/rideSlice';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: '6px'
};

// FAST NUCES Lahore roughly coordinates
const center = {
  lat: 31.4812,
  lng: 74.3032
};

export default function LiveMap({ rId }) {
    const [msg, setMsg] = React.useState('');
    // State to hold the draggable pin's location
    const [pinLoc, setPinLoc] = React.useState(center); 
    
    const chats = useSelector(s => s.rd.chats.filter(c => c.rId === rId));
    const cUsr = useSelector(s => s.usr.currUsr);
    const dsp = useDispatch();

    // The trick: leaving googleMapsApiKey empty or dummy triggers dev mode
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "" // No credit card needed!
    });

    const sndChat = (e) => {
        e.preventDefault();
        dsp(sndMsg({rId, sndr: cUsr.nm, txt: msg}));
        setMsg('');
    }

    const handleDragEnd = (e) => {
        // Jab pin drop hoga, ye nayi location pakar lega
        const newLat = e.latLng.lat();
        const newLng = e.latLng.lng();
        setPinLoc({ lat: newLat, lng: newLng });
        console.log("New Pin Dropped At: ", newLat, newLng);
    }

    return (
        <div className="boxCrd" style={{marginTop: '20px'}}>
            <div className="bigText">Live Tracking & Route Matching</div>
            
            <div style={{marginBottom: '20px'}}>
                {!isLoaded ? (
                    <p>Loading Google Maps...</p>
                ) : (
                    <div style={{ position: 'relative' }}>
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={13}
                        >
                            {/* Ye wo pin hai jisko user drag kar sakta hai */}
                            <Marker 
                                position={pinLoc} 
                                draggable={true} 
                                onDragEnd={handleDragEnd} 
                            />
                        </GoogleMap>
                        
                        <div style={{ marginTop: '10px', fontSize: '13px', color: '#555' }}>
                            <strong>Current Pin Coordinates:</strong> {pinLoc.lat.toFixed(4)}, {pinLoc.lng.toFixed(4)}
                            <br/>
                            <span style={{ fontSize: '11px' }}>Drag the pin to set your exact pickup/dropoff location!</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="bigText" style={{fontSize: '18px', marginTop: '30px'}}>Ride Chat</div>
            <div style={{height: '150px', overflowY: 'scroll', border: '1px solid #ddd', padding: '10px', marginBottom: '10px', borderRadius: '4px'}}>
                {chats.length === 0 ? <p className="smText">No messages yet. Be the first to say hi!</p> : null}
                {chats.map((c, i) => <div key={i} style={{marginBottom: '8px'}}><strong>{c.sndr}:</strong> {c.txt}</div>)}
            </div>

            <form style={{display: 'flex', gap: '10px'}} onSubmit={sndChat}>
                <input style={{marginBottom: 0}} placeholder="Coordinate exact pickup..." value={msg} onChange={e=>setMsg(e.target.value)} />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}