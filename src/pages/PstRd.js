import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addRd } from '../slices/rideSlice';
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';

// fast uni k coordinates
const fastLoc = { lat: 31.4812, lng: 74.3032 };
const mapSty = { width: '100%', height: '300px', borderRadius: '6px', marginBottom: '15px' };

// gari nikalne ka time
export default function PstRd() 
{
  const [dTime, setDTime] = React.useState('');
    const [avlSts, setAvlSts] = React.useState('');
  const [cnt, setCnt] = React.useState('');
  
  // map states
  const [pinLoc, setPinLoc] = React.useState({ lat: 31.5204, lng: 74.3587 }); 
    const [addy, setAddy] = React.useState('Drag pin to set location');
  const [toFast, setToFast] = React.useState(true); // autofill FAST toggle
  
  const dsp = useDispatch();
    const cUsr = useSelector(s => s.usr.currUsr);
  const nav = useNavigate();

  const { isLoaded } = useJsApiLoader({ id: 'gmap-script', googleMapsApiKey: "" }); // dev mode map

  // location ka naam nikalnay ka free jugaad
  const getAddyText = async (lt, lg) => 
  {
      setAddy("Loading address...");
      try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lt}&lon=${lg}`);
          const dat = await res.json();
          const shortAddy = dat.display_name.split(',').slice(0, 3).join(',');
            setAddy(shortAddy);
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

  const hndlPst = (e) => 
  {
    e.preventDefault();
      const seatsNum = parseInt(avlSts);
    if(seatsNum < 1 || seatsNum > 7) return alert("Seats 1-7 k darmian");
      if(!/^03\d{9}$/.test(cnt)) return alert("Number theek likho");
    if(addy.includes('Drag pin')) return alert("Map pe location set karo");

    // autofill logic: ek side map ki location, dusri side FAST
    const pick = toFast ? addy : "FAST NUCES";
      const dest = toFast ? "FAST NUCES" : addy;
    
    // Gari details DB se uthai hain idhar redundancy khatam
    const veh = cUsr.vehDeets || "Captain's Car";

      dsp(addRd({ dNm: cUsr.nm, pick, dest, dTime, avlSts: seatsNum, veh, cnt, nts: "Location set via Google Maps" }));
    nav('/rides');
  }

  return (
    <div className="mainCont boxCrd">
      <div className="bigText">Offer a Ride (Map Route)</div>
      
      {/* Auto-fill buttons */}
      <div style={{marginBottom: '20px', display: 'flex', gap: '10px'}}>
          <button className={toFast ? '' : 'btn-sec'} type="button" onClick={() => setToFast(true)}>Going TO FAST</button>
            <button className={!toFast ? '' : 'btn-sec'} type="button" onClick={() => setToFast(false)}>Leaving FROM FAST</button>
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

      <form onSubmit={hndlPst}>
        <input type="datetime-local" required value={dTime} onChange={e=>setDTime(e.target.value)} />
          <input type="number" placeholder="Available Seats (1-7)" required value={avlSts} onChange={e=>setAvlSts(e.target.value)} />
        <input placeholder="Contact Number (03xxxxxxxxx)" required value={cnt} onChange={e=>setCnt(e.target.value)} />
          <button type="submit">Publish Route</button>
      </form>
    </div>
  )
}