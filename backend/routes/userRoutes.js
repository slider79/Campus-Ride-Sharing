const expressApp = require('express');
const userRouter = expressApp.Router();
const userController = require('../controllers/userController');
 const checkAuth = require('../middleware/authMiddleware');

 // wahi routes jo assignemnt k hisab se zaroori hain
 userRouter.post('/register', userController.registerUser);
userRouter.post('/login', userController.loginUser);
  userRouter.post('/logout', checkAuth, userController.logoutUser); // protected q k requriement tha login walo k lye
userRouter.put('/changePassword', checkAuth, userController.changePassword); 

module.exports = userRouter;