import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postRide } from '../slices/rideSlice';
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';

const fastLoc = { lat: 31.4812, lng: 74.3032 };
const mapSty = { width: '100%', height: '300px', borderRadius: '6px', marginBottom: '15px' };

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
  const token = useSelector(s => s.usr.token);
  const nav = useNavigate();

  const { isLoaded } = useJsApiLoader({ id: 'gmap-script', googleMapsApiKey: "" }); // dev mode map

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
      if (!cUsr || !token) {
      alert('You must be logged in to publish a ride.');
      nav('/login');
      return;
    }

    const seatsNum = parseInt(avlSts);
    if(seatsNum < 1 || seatsNum > 7) return alert("Seats must be between 1 and 7");
      if(!/^03\d{9}$/.test(cnt)) return alert("Invalid phone number format");
    if(addy.includes('Drag pin')) return alert("Please set a location on the map");

    // autofill logic
    const pick = toFast ? addy : "FAST NUCES";
      const dest = toFast ? "FAST NUCES" : addy;
    
    // Combine the three fields into one clean display string
    const veh = cUsr.vehDeets ? `${cUsr.vehDeets} (${cUsr.color}) - ${cUsr.plate}` : "Captain's Car";
    const rideData = {
      dNm: cUsr.userName || cUsr.nm,
      pick,
      dest,
      dTime,
      veh,
      cnt,
      nts: "Location set via Google Maps",
      avlSts: seatsNum,
      passngrs: 0,
      actv: true
    };

      dsp(postRide({ rideData, token }))
        .unwrap()
        .then(() => nav('/rides'))
        .catch((err) => alert(err || 'Unable to publish ride.'));
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