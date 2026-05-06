import React from 'react';
import { useSelector } from 'react-redux';

// jo seats pakri hain unka hisab kitab
export default function MyBks() 
{
    const bks = useSelector(s => s.rd.myBks);
      const cUsr = useSelector(s => s.usr.currUsr);
    const uBks = bks.filter(b => b.rideId && (b.rideId.pick || '')).length > 0 ? bks : [];

    return (
        <div className="mainCont">
            <div className="bigText">My Bookings</div>
              {uBks.length === 0 ? <p>No bookings yet boss.</p> : null}
            {uBks.map((b, i) => (
                <div key={i} className="boxCrd">
                    <p><strong>Route:</strong> {b.rideId?.pick} to {b.rideId?.dest}</p>
                      <p className="smText">Ride ID: {b.rideId?.rId}</p>
                </div>
            ))}
        </div>
    )
}