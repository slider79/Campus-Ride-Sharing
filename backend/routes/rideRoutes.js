const expressApp = require('express');
const rideRouter = expressApp.Router();
 const rideController = require('../controllers/rideController');
const checkAuth = require('../middleware/authMiddleware');

  rideRouter.get('/', rideController.getAvailableRides); // public available
rideRouter.get('/myBookings', checkAuth, rideController.getMyBookings); // protected apni rides dekhnay ke liye
rideRouter.get('/:id', rideController.getRideDetails); // public ride details
 rideRouter.post('/postRide', checkAuth, rideController.postNewRide); // protected kyunke post wese thori karsakta koi
rideRouter.post('/book/:id', checkAuth, rideController.bookSeat); // protected seat book

module.exports = rideRouter;