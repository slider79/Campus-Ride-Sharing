const expressApp = require('express');
const userRouter = expressApp.Router();
const userController = require('../controllers/userController');
 const checkAuth = require('../middleware/authMiddleware');

 userRouter.get('/', userController.getAllUsers);
 userRouter.post('/register', userController.registerUser);
userRouter.post('/login', userController.loginUser);
  userRouter.post('/logout', checkAuth, userController.logoutUser); // protected q k requriement tha login walo ke liye waise we could look at this later for full project waqt but khair
userRouter.put('/changePassword', checkAuth, userController.changePassword); 

module.exports = userRouter;