import React from 'react';
import { useSelector } from 'react-redux';

// jo seats pakri hain unka hisab kitab
export default function MyBks() 
{
    const bks = useSelector(s => s.rd.myBks);
      const cUsr = useSelector(s => s.usr.currUsr);
    const uBks = bks.filter(b => b.uEml === cUsr?.eml);

    return (
        <div className="mainCont">
            <div className="bigText">My Bookings</div>
              {uBks.length === 0 ? <p>No bookings yet boss.</p> : null}
            {uBks.map((b, i) => (
                <div key={i} className="boxCrd">
                    <p><strong>Route:</strong> {b.pick} to {b.dest}</p>
                      <p className="smText">Ride ID: {b.rId}</p>
                </div>
            ))}
        </div>
    )
}