import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reqRd } from '../slices/rideSlice';
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';

const fastLoc = { lat: 31.4812, lng: 74.3032 };
const mapSty = { width: '100%', height: '300px', borderRadius: '6px', marginBottom: '15px' };

// paidal chalne walon k liye map
export default function RqRd() 
{
    const dsp = useDispatch();
      const cUsr = useSelector(s => s.usr.currUsr);
    const nav = useNavigate();

    const [pinLoc, setPinLoc] = React.useState({ lat: 31.5204, lng: 74.3587 }); 
  const [addy, setAddy] = React.useState('Drag pin to set your location');
    const [toFast, setToFast] = React.useState(true); // autofill logic
    
    const { isLoaded } = useJsApiLoader({ id: 'gmap-script', googleMapsApiKey: "" });

    const getAddyText = async (lt, lg) => 
    {
        setAddy("Loading address...");
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lt}&lon=${lg}`);
              const dat = await res.json();
            setAddy(dat.display_name.split(',').slice(0, 3).join(','));
        } catch(err) {
              setAddy("Lahore (Pin Location)");
        }
    }

    const hndlDrag = (e) => 
    {
          const lt = e.latLng.lat();
        const lg = e.latLng.lng();
          setPinLoc({ lat: lt, lng: lg });
        getAddyText(lt, lg);
    }

    const subReq = (e) => 
    {
        e.preventDefault();
        if(addy.includes('Drag pin')) return alert("Bhai location to map se select karo");
        
        const pick = toFast ? addy : "FAST NUCES";
          const dest = toFast ? "FAST NUCES" : addy;
        
        dsp(reqRd({nm: cUsr.nm, pick, dest}));
          alert("Ride request posted via Map!");
        nav('/rides');
    }

    return (
        <div className="mainCont boxCrd">
            <div className="bigText">Request a Ride (Map Integrated)</div>
              
              <div style={{marginBottom: '20px', display: 'flex', gap: '10px'}}>
               <button className={toFast ? '' : 'btn-sec'} type="button" onClick={() => setToFast(true)}>Need ride TO FAST</button>
                 <button className={!toFast ? '' : 'btn-sec'} type="button" onClick={() => setToFast(false)}>Need ride FROM FAST</button>
            </div>

            <div style={{background: '#f9f9f9', padding: '15px', borderRadius: '6px', marginBottom: '20px', border: '1px solid #ddd'}}>
               <p className="smText"><strong>Pickup:</strong> {toFast ? addy : "FAST NUCES"}</p>
                 <p className="smText"><strong>Dropoff:</strong> {toFast ? "FAST NUCES" : addy}</p>
            </div>

            {!isLoaded ? <p>Map Loading...</p> : (
               <GoogleMap mapContainerStyle={mapSty} center={pinLoc} zoom={12}>
                  <Marker position={pinLoc} draggable={true} onDragEnd={hndlDrag} />
                    <Marker position={fastLoc} icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png" />
                  <Polyline path={[pinLoc, fastLoc]} options={{ strokeColor: '#111', strokeOpacity: 0.8, strokeWeight: 3, dashArray: '5, 5' }} />
               </GoogleMap>
            )}

            <form onSubmit={subReq}>
               <button type="submit" style={{width: '100%', marginTop: '10px'}}>Submit Request</button>
            </form>
        </div>
    )
}