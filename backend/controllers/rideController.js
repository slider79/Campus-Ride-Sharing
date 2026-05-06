const rideModel = require('../models/rideModel');
const bookingModel = require('../models/bookingModel');
const requestModel = require('../models/requestModel');
const { calculateFare, FAST_LOCATION } = require('../utils/fareCalculator');

const getMyRides = async (request, response) => {
  try {
    const captainId = request.userData.id;
    const myRides = await rideModel.find({ captainId }).populate('captainId', '-password');
    response.json(myRides);
  } catch(error) {
    console.log(error);
    response.status(500).json({message: 'Cannot fetch your rides'});
  }
}

const getAvailableRides = async (request, response) => {
  try{
      let allRides = await rideModel.find();
        let filteredRides = [];

     for(let index=0; index<allRides.length; index++){
        let isMatch = true;
       if(request.query.pick && allRides[index].pick !== request.query.pick) isMatch = false;
          if(request.query.dest && allRides[index].dest !== request.query.dest) isMatch = false;

        if(isMatch) filteredRides.push(allRides[index]);
     }

     response.json(filteredRides);
  }catch(error){ response.status(500).json({message:"matter hogya get rides me"}); }
}

const postNewRide = async (request, response) => {
   try{
     const numSeats = parseInt(request.body.avlSts) || 1;
     
     // Calculate fare based on distance and number of seats
     const distanceKm = request.body.distanceKm || 0;
     const fareBreakdown = calculateFare(distanceKm, numSeats);
     
     const newRide = new rideModel({
       captainId: request.userData.id,
       rId: Math.random().toString(36).substring(2, 10),
       dNm: request.body.dNm,
       pick: request.body.pick,
       dest: request.body.dest,
       dTime: request.body.dTime,
       veh: request.body.veh,
       cnt: request.body.cnt,
       nts: request.body.nts,
       avlSts: numSeats,
       price: request.body.price || fareBreakdown.totalFare,
       
       // Fare calculation fields
       distanceKm: distanceKm,
       baseFare: fareBreakdown.baseFare,
      ratePerKm: 25,
       farePerSeat: fareBreakdown.farePerSeat,
       totalFareAllSeats: fareBreakdown.totalFare,
       
       // Coordinates for distance recalculation
       pickupLat: request.body.pickupLat,
       pickupLng: request.body.pickupLng,
       pickupAddress: request.body.pickupAddress,
       goingToFast: request.body.goingToFast !== undefined ? request.body.goingToFast : true
     });
      await newRide.save();
     response.json({
       ...newRide.toObject(),
       fareBreakdown: fareBreakdown
     });
   } catch(error) { 
     console.log(error); 
     response.status(500).json({message:"error posting ride"}); 
   }
}

const getRideDetails = async (request, response) => {
    try{
       const rideDetails = await rideModel.findOne({ rId: request.params.id });
         if(!rideDetails) return response.status(404).json({message: "aisi koi ride nahi, wapas gari mooro"});
         response.json(rideDetails);
    } catch(error) { response.status(500).json({message: "error boss"}); }
}

const bookSeat = async (request, response) => {
   try{
      let foundRide = await rideModel.findOne({ rId: request.params.id });
         if(!foundRide) return response.status(404).json({message: "aisi koi ride nahi, wapas gari mooro"});
         if(foundRide.avlSts <= 0){
           return response.status(400).json({message: "seatain full hain dost, latak k aana parega"});
         }
         foundRide.avlSts = foundRide.avlSts - 1; // wah wah kya logic hai im so frickin smart
         foundRide.passngrs = foundRide.passngrs + 1;
           await foundRide.save();

       // booking db me daalo 
         let newBooking = new bookingModel({userId: request.userData.id, rideId: foundRide._id});
        await newBooking.save();

        response.json(foundRide);
   } catch(error){ console.log(error); response.status(500).json({message: "server dead"}); }
}

const getMyBookings = async (request, response) => {
     try{
         // populate mar lete hain idhar asani ki khatir
        const myBookingsList = await bookingModel.find({userId: request.userData.id}).populate('rideId');
        response.json(myBookingsList);
     } catch(error) { response.status(500).json({message: "masla hai idhar my bookings me"}); }
}

const postRequest = async (request, response) => {
    try {
        const pick = request.body.pick || request.body.location || '';
        const dest = request.body.dest || 'FAST NUCES';
        const newReq = new requestModel({
            userId: request.userData.id,
            location: request.body.location || pick,
            pick,
            dest,
            toFast: request.body.toFast !== undefined ? request.body.toFast : true
        });
        await newReq.save();
        const savedReq = await requestModel.findById(newReq._id).populate('userId', 'userName');
        response.status(201).json(savedReq);
    } catch (e) { response.status(500).json({message: "request urr gayi"}); }
}

const completeRide = async (request, response) => {
  try {
    const foundRide = await rideModel.findOne({ rId: request.params.id });
    if(!foundRide) return response.status(404).json({message: "Ride not found"});

    if(String(foundRide.captainId) !== String(request.userData.id) && request.userData.role !== 'admin') {
      return response.status(403).json({message: "Only ride captain or admin can mark ride completed."});
    }

    foundRide.actv = false;
    foundRide.completedAt = new Date();
    await foundRide.save();

    response.json(foundRide);
  } catch(error) {
    console.log(error);
    response.status(500).json({message: "Could not mark ride as completed"});
  }
}


const getRequests = async (request, response) => {
    try {
        const allReqs = await requestModel.find({isActive: true}).populate('userId', 'userName');
        response.json(allReqs);
    } catch (e) { response.status(500).json({message: "get requests urr gaya"}); }
}

module.exports = {getAvailableRides, postNewRide, getRideDetails, bookSeat, getMyBookings, postRequest, getRequests, getMyRides, completeRide};