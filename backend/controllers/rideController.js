const rideModel = require('../models/rideModel');
const bookingModel = require('../models/bookingModel');
const requestModel = require('../models/requestModel');

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
         avlSts: request.body.avlSts,
         price: request.body.price
     });
      await newRide.save();
     response.json(newRide);
   } catch(error) { console.log(error); response.status(500).json({message:"error bro"}); }
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
        const newReq = new requestModel({
            userId: request.userData.id,
            location: request.body.location
        });
        await newReq.save();
        response.json({message: "Pin drop hogya hai, koi farishta aake pick karlega"});
    } catch (e) { response.status(500).json({message: "request urr gayi"}); }
}


const getRequests = async (request, response) => {
    try {
        const allReqs = await requestModel.find({isActive: true}).populate('userId', 'userName');
        response.json(allReqs);
    } catch (e) { response.status(500).json({message: "get requests urr gaya"}); }
}

module.exports = {getAvailableRides, postNewRide, getRideDetails, bookSeat, getMyBookings, postRequest, getRequests};