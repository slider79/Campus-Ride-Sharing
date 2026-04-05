import React from 'react';

export default function FareCalc({ distKm, actvPass }) {
    // Base Fare: 50 PKR per passenger[cite: 2]
    // Distance Charge: 25 PKR per km[cite: 2]
    const baseFare = 50;
    const distChg = distKm * 25;
    let totFare = baseFare + distChg;

    // The total accumulated fare is divided among them to make the ride cheaper as more people join[cite: 2]
    if (actvPass > 0) {
        totFare = totFare / actvPass; 
    }

    return (
        <div style={{background: '#f5f5f5', padding: '10px', borderRadius: '4px', marginTop: '10px'}}>
            <strong>Estimated Fare: </strong> {totFare.toFixed(2)} PKR per head
            <div className="smText">(Based on {distKm}km distance and {actvPass || 1} active passengers)</div>
        </div>
    )
}