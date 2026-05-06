const userModel = require('../models/userModel');
const jwtToken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET || 'babaKiRani';

const registerUser = async (request, response) => {
 try{
   // pehle check karo pehle se tou nai
   const foundUser = await userModel.findOne({email: request.body.email});
     if(foundUser) {
      return response.status(400).json({message: "Email already registered. Please use a different email."});
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(request.body.password, 10);

    const newUser = new userModel({
     userName: request.body.userName,
     email: request.body.email,
       password: hashedPassword,
       roll: request.body.roll,
       degree: request.body.degree
    });
    await newUser.save();
     response.json({message: "Account registered successfully! Please log in."});
 }catch(error){
    console.log(error);
    response.status(500).json({message: "Registration failed. Please try again."});
 }
}

const loginUser = async (request, response) => {
   try{
      const foundUser = await userModel.findOne({email: request.body.email});
        if(!foundUser) return response.status(400).json({message: "Invalid email or password."});

       // Compare hashed password
       const isPasswordValid = await bcrypt.compare(request.body.password, foundUser.password);
       if(!isPasswordValid) return response.status(400).json({message: "Invalid email or password."});

       // token pack kardo
       const userToken = jwtToken.sign({id: foundUser._id, role: foundUser.role}, secretKey, { expiresIn: '7d' });
       const userObj = foundUser.toObject();
       delete userObj.password;
     response.json({token: userToken, user: userObj, message: "Login successful!"});
   }catch(error){ response.status(500).json({message: "Login failed. Please try again."});}
}

const logoutUser = (request, response) => {
   // wese logout frontend pe token delete karne se hota hai
   // par inhonay rest api mangi thi tou route likhni par gayi
   response.json({message: "Logged out successfully."});
}

const changePassword = async (request, response) => {
 try{
    // find then update, save karne mein alag maza hai compare to findByIdAndUpdate
     let foundUser = await userModel.findById(request.userData.id);
     
     // Compare old password with stored hash
     const isOldPasswordValid = await bcrypt.compare(request.body.oldPassword, foundUser.password);
     if(!isOldPasswordValid) {
         return response.status(400).json({message: "Current password is incorrect."});
     }
     
     // Hash new password
     const hashedNewPassword = await bcrypt.hash(request.body.newPassword, 10);
      foundUser.password = hashedNewPassword;
      await foundUser.save();
       response.json({message: "Password changed successfully!"});
 } catch(error){ response.status(500).json({message: "Error changing password"}); }
}

const getAllUsers = async (request, response) => {
  try {
    const users = await userModel.find().select('-password');
    response.json(users);
  } catch(error) {
    console.log(error);
    response.status(500).json({message: 'Cannot fetch users'});
  }
};

const applyCaptain = async (request, response) => {
  try {
    const userId = request.userData.id;
    const foundUser = await userModel.findById(userId);
    if(!foundUser) return response.status(404).json({message: 'User not found'});

    foundUser.captPending = true;
    foundUser.vehDeets = request.body.veh || foundUser.vehDeets;
    foundUser.plate = request.body.plate || foundUser.plate;
    foundUser.color = request.body.color || foundUser.color;
    foundUser.idPic = request.body.idPic || foundUser.idPic;
    foundUser.licPic = request.body.licPic || foundUser.licPic;

    await foundUser.save();
    const userObj = foundUser.toObject();
    delete userObj.password;
    response.json(userObj);
  } catch(error) {
    console.log(error);
    response.status(500).json({message: 'Could not submit captain application'});
  }
};

const approveCaptain = async (request, response) => {
    try {
        // Sirf admin allow hai, baki sab ko laat maro
        if(request.userData.role !== 'admin') {
            return response.status(403).json({message: "Admin access required."});
        }

        let pendingUser = await userModel.findById(request.params.id);
        if(!pendingUser) return response.status(404).json({message: "User not found."});

        // Captain bana do
        pendingUser.captPending = false;
        pendingUser.isCapt = true;
        pendingUser.role = 'captain';
        
        await pendingUser.save();
        const sanitized = pendingUser.toObject();
        delete sanitized.password;
        response.json(sanitized);
    } catch(error) { response.status(500).json({message: "Error approving captain"}); }
}

module.exports = {registerUser, loginUser, logoutUser, changePassword, getAllUsers, applyCaptain, approveCaptain};