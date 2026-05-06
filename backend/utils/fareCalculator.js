/**
 * Fare Calculation Utility for Campus Rides
 * 
 * Pricing Formula:
 * - Base Fare: PKR 50 per passenger
 * - Distance Charge: PKR 25 per kilometer
 * - Total Fare = (Base Fare + Distance Charge) per passenger
 * - Fare splits equally among number of booked seats
 */

const FAST_LOCATION = { lat: 31.4812, lng: 74.3032 };
const BASE_FARE = 50; // PKR per passenger
const RATE_PER_KM = 25; // PKR per kilometer

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - Latitude of first point
 * @param {number} lng1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lng2 - Longitude of second point
 * @returns {number} Distance in kilometers (rounded to 2 decimals)
 */
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 100) / 100; // Round to 2 decimals
}

/**
 * Calculate fare based on distance and number of passengers
 * @param {number} distanceKm - Distance in kilometers
 * @param {number} numPassengers - Number of passengers (including driver capacity)
 * @returns {object} Fare breakdown object
 */
function calculateFare(distanceKm, numPassengers = 1) {
  if (distanceKm < 0) {
    throw new Error('Distance cannot be negative');
  }
  
  if (numPassengers < 1) {
    throw new Error('Number of passengers must be at least 1');
  }
  
  // Calculate total fare (base + distance charge) per seat
  const farePerSeat = BASE_FARE + (RATE_PER_KM * distanceKm);
  
  // Total fare for all passengers
  const totalFare = farePerSeat * numPassengers;
  
  return {
    baseFare: BASE_FARE,
    distanceCharge: Math.round(RATE_PER_KM * distanceKm * 100) / 100,
    distanceKm: distanceKm,
    farePerSeat: Math.round(farePerSeat * 100) / 100,
    totalFare: Math.round(totalFare * 100) / 100,
    numPassengers: numPassengers,
    breakdown: {
      basePerPassenger: BASE_FARE,
      distancePerPassenger: Math.round(RATE_PER_KM * distanceKm * 100) / 100
    }
  };
}

/**
 * Calculate fare from pickup/dropoff coordinates
 * Uses FAST NUCES as one reference point
 * 
 * @param {object} pickupCoords - {lat, lng} of pickup location
 * @param {object} dropoffCoords - {lat, lng} of dropoff location (or null for FAST)
 * @param {number} numPassengers - Number of available seats
 * @param {boolean} goingToFast - true if going TO FAST, false if leaving FROM FAST
 * @returns {object} Fare breakdown including distance
 */
function calculateRideFare(pickupCoords, dropoffCoords, numPassengers, goingToFast = true) {
  let distance;
  
  if (goingToFast) {
    // Calculate distance from pickup to FAST
    distance = calculateDistance(
      pickupCoords.lat,
      pickupCoords.lng,
      FAST_LOCATION.lat,
      FAST_LOCATION.lng
    );
  } else {
    // Calculate distance from FAST to dropoff
    distance = calculateDistance(
      FAST_LOCATION.lat,
      FAST_LOCATION.lng,
      pickupCoords.lat,
      pickupCoords.lng
    );
  }
  
  return calculateFare(distance, numPassengers);
}

/**
 * Calculate per-passenger fare after booking
 * @param {number} totalFare - Total fare for the ride
 * @param {number} currentPassengers - Number of currently booked passengers
 * @returns {number} Per-passenger fare (rounded to 2 decimals)
 */
function calculatePerPassengerFare(totalFare, currentPassengers) {
  if (currentPassengers === 0) {
    return Math.round(totalFare * 100) / 100;
  }
  return Math.round((totalFare / currentPassengers) * 100) / 100;
}

module.exports = {
  calculateDistance,
  calculateFare,
  calculateRideFare,
  calculatePerPassengerFare,
  FAST_LOCATION,
  BASE_FARE,
  RATE_PER_KM
};
