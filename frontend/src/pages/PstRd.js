import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postRide } from '../slices/rideSlice';
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';

const fastLoc = { lat: 31.4812, lng: 74.3032 };
const mapSty = { width: '100%', height: '300px', borderRadius: '6px', marginBottom: '15px' };

// Haversine formula to calculate distance between two coordinates
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 100) / 100; // Round to 2 decimals
};

// Calculate fare breakdown
const calculateFareBreakdown = (distanceKm, numSeats) => {
  const BASE_FARE = 50; // PKR per passenger
  const RATE_PER_KM = 25; // PKR per km
  
  const distanceCharge = Math.round(RATE_PER_KM * distanceKm * 100) / 100;
  const farePerSeat = BASE_FARE + distanceCharge;
  const totalFare = farePerSeat * numSeats;
  
  return {
    baseFare: BASE_FARE,
    distanceCharge,
    distanceKm,
    farePerSeat: Math.round(farePerSeat * 100) / 100,
    totalFare: Math.round(totalFare * 100) / 100,
    numSeats
  };
};

export default function PstRd() 
{
  const [dTime, setDTime] = React.useState('');
  const [avlSts, setAvlSts] = React.useState('');
  const [cnt, setCnt] = React.useState('');
  
  // map states
  const [pinLoc, setPinLoc] = React.useState({ lat: 31.5204, lng: 74.3587 }); 
  const [addy, setAddy] = React.useState('Drag pin to set location');
  const [manualLoc, setManualLoc] = React.useState('');
  const [toFast, setToFast] = React.useState(true); // autofill FAST toggle
  const [fareInfo, setFareInfo] = React.useState(null);
  
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
    
    // Calculate and display fare preview (if seats are set)
    if (avlSts) {
      const dist = calculateDistance(lt, lg, fastLoc.lat, fastLoc.lng);
      const fare = calculateFareBreakdown(dist, parseInt(avlSts));
      setFareInfo(fare);
    }
  }

  const hndlSeatsChange = (e) => {
    const seats = e.target.value;
    setAvlSts(seats);
    
    // Update fare info when seats change
    if (seats && fareInfo) {
      const fare = calculateFareBreakdown(fareInfo.distanceKm, parseInt(seats));
      setFareInfo(fare);
    }
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

    const location = addy.includes('Drag pin') ? manualLoc.trim() : addy;
    if(!location) return alert("Please set a location on the map or enter it manually.");

    // autofill logic
    const pick = toFast ? location : "FAST NUCES";
    const dest = toFast ? "FAST NUCES" : location;
    
    // Calculate distance
    const distanceKm = calculateDistance(pinLoc.lat, pinLoc.lng, fastLoc.lat, fastLoc.lng);
    const fareBreakdown = calculateFareBreakdown(distanceKm, seatsNum);
    
    // Combine the three fields into one clean display string
    const veh = cUsr.vehDeets ? `${cUsr.vehDeets} (${cUsr.color}) - ${cUsr.plate}` : "Captain's Car";
    const rideData = {
      dNm: cUsr.userName,
      pick,
      dest,
      dTime,
      veh,
      cnt,
      nts: "Location set via Google Maps",
      avlSts: seatsNum,
      passngrs: 0,
      actv: true,
      price: fareBreakdown.totalFare,
      
      // Fare calculation data
      distanceKm: distanceKm,
      pickupLat: pinLoc.lat,
      pickupLng: pinLoc.lng,
      pickupAddress: location,
      goingToFast: toFast
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

      {/* Location preview */}
      <div style={{background: '#f9f9f9', padding: '15px', borderRadius: '6px', marginBottom: '20px', border: '1px solid #ddd'}}>
        <p className="smText"><strong>Pickup:</strong> {toFast ? addy : "FAST NUCES"}</p>
        <p className="smText"><strong>Dropoff:</strong> {toFast ? "FAST NUCES" : addy}</p>
        {fareInfo && <p className="smText"><strong>Distance:</strong> {fareInfo.distanceKm} km</p>}
      </div>

      {!isLoaded ? <p>Map Loading...</p> : (
        <GoogleMap mapContainerStyle={mapSty} center={pinLoc} zoom={12}>
          <Marker position={pinLoc} draggable={true} onDragEnd={hndlDrag} />
          <Marker position={fastLoc} icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png" />
          <Polyline path={[pinLoc, fastLoc]} options={{ strokeColor: '#111', strokeOpacity: 0.8, strokeWeight: 3, dashArray: '5, 5' }} />
        </GoogleMap>
      )}

      {/* Fare breakdown preview */}
      {fareInfo && (
        <div style={{background: '#e8f5e9', padding: '12px', borderRadius: '6px', marginBottom: '20px', border: '1px solid #4caf50'}}>
          <div className="smText"><strong>💰 Fare Breakdown:</strong></div>
          <div className="smText">Base Fare: PKR {fareInfo.baseFare} × {fareInfo.numSeats} passengers</div>
          <div className="smText">Distance Charge: PKR {fareInfo.distanceCharge} × {fareInfo.numSeats} passengers</div>
          <div className="smText" style={{fontWeight: 'bold', marginTop: '8px', fontSize: '16px'}}>
            Per Seat: PKR {fareInfo.farePerSeat} | Total for all seats: PKR {fareInfo.totalFare}
          </div>
        </div>
      )}

      <form onSubmit={hndlPst}>
        <input type="datetime-local" required value={dTime} onChange={e=>setDTime(e.target.value)} />
        <input type="number" placeholder="Available Seats (1-7)" required value={avlSts} onChange={hndlSeatsChange} />
        <input placeholder="Contact Number (03xxxxxxxxx)" required value={cnt} onChange={e=>setCnt(e.target.value)} />
        {(!isLoaded || addy.includes('Drag pin')) && (
          <input placeholder="Manual pickup/dropoff location" value={manualLoc} onChange={e=>setManualLoc(e.target.value)} />
        )}
        <button type="submit">Publish Route</button>
      </form>
    </div>
  )
}