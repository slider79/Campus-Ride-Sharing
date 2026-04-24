const expressApp = require('express');
const userRouter = expressApp.Router();
const userController = require('../controllers/userController');
 const checkAuth = require('../middleware/authMiddleware');

 userRouter.get('/', userController.getAllUsers);
 userRouter.post('/register', userController.registerUser);
userRouter.post('/login', userController.loginUser);
  userRouter.post('/logout', checkAuth, userController.logoutUser); // protected q k requriement tha login walo ke liye waise we could look at this later for full project waqt but khair
userRouter.put('/changePassword', checkAuth, userController.changePassword); 
userRouter.get('/all', checkAuth, userController.getAllUsers); // Sab users lao
userRouter.put('/approve/:id', checkAuth, userController.approveCaptain); // Captain ko pass karo

module.exports = userRouter;