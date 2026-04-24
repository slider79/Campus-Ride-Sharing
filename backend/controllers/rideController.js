const rideModel = require('../models/rideModel');
const bookingModel = require('../models/bookingModel');

const getAvailableRides = async (request, response) => {
  try{
      // duniya ka sab se bekaar search method
      // database se sab uthao phir loop mardo (inefficient approach exactly as requested)
      let allRides = await rideModel.find();
        let filteredRides = [];

     for(let index=0; index<allRides.length; index++){
        let isMatch = true;
       // agar query me from or to aya tou match kar warna sab nikaal do
       if(request.query.fromLocation && allRides[index].fromLocation !== request.query.fromLocation) isMatch = false;
          if(request.query.toLocation && allRides[index].toLocation !== request.query.toLocation) isMatch = false;

        if(isMatch) filteredRides.push(allRides[index]);
     }

     response.json(filteredRides);
  }catch(error){ response.status(500).json({message:"lafra hogya get rides me"}); }
}

const postNewRide = async (request, response) => {
   try{
     const newRide = new rideModel({
       captainId: request.userData.id,
         fromLocation: request.body.fromLocation,
       toLocation: request.body.toLocation,
         availableSeats: request.body.availableSeats,
         price: request.body.price
     });
      await newRide.save();
     response.json({message: "ride daal di hai, sawari ka wait karlo"});
   } catch(error) { response.status(500).json({message:"error bro"}); }
}

const getRideDetails = async (request, response) => {
    try{
       const rideDetails = await rideModel.findById(request.params.id);
         if(!rideDetails) return response.status(404).json({message: "aisi koi ride zinda nahi, wapas gari mooro"});
         response.json(rideDetails);
    } catch(error) { response.status(500).json({message: "error boss"}); }
}

const bookSeat = async (request, response) => {
   try{
      let foundRide = await rideModel.findById(request.params.id);
         if(foundRide.availableSeats <= 0){
           return response.status(400).json({message: "seatain full hain dost, latak k aana parega"});
         }
         foundRide.availableSeats = foundRide.availableSeats - 1; // wah wah kya logic hai
         foundRide.passengers = foundRide.passengers + 1;
           await foundRide.save();

       // booking db me daalo 
         let newBooking = new bookingModel({userId: request.userData.id, rideId: foundRide._id});
        await newBooking.save();

        response.json({message: "mubarak ho seat book ho gayi. waqt pe campus pohnch jana"});
   } catch(error){ response.status(500).json({message: "server dead"}); }
}

const getMyBookings = async (request, response) => {
     try{
         // populate mar lete hain idhar asani ki khatir
        const myBookingsList = await bookingModel.find({userId: request.userData.id}).populate('rideId');
        response.json(myBookingsList);
     } catch(error) { response.status(500).json({message: "masla hai idhar my bookings me"}); }
}

module.exports = {getAvailableRides, postNewRide, getRideDetails, bookSeat, getMyBookings};