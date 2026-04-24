const userModel = require('../models/userModel');
const jwtToken = require('jsonwebtoken');
 const secretKey = "babaKiRani";

const registerUser = async (request, response) => {
 try{
   // pehle check karo pehle se tou nai
   const foundUser = await userModel.findOne({email: request.body.email});
     if(foundUser) {
      return response.status(400).json({message: "yeh email tou pehle se kisi k pass hai naya email lao"});
    }

    const newUser = new userModel({
     userName: request.body.userName,
     email: request.body.email,
       password: request.body.password,
       roll: request.body.roll,
       degree: request.body.degree
    });
    await newUser.save();
     response.json({message: "mubarak ho id ban gayi"});
 }catch(error){
    console.log(error);
    response.status(500).json({message: "server thak gaya, FAST ke internet pe chalao ge to yahi hoga, dubara try karo"});
 }
}

const loginUser = async (request, response) => {
   try{
      const foundUser = await userModel.findOne({email: request.body.email, password: request.body.password});
        if(!foundUser) return response.status(400).json({message: "email ya password ghalat dalte ho phir boltay ho chalta nai tsk tsk"});

       // token pack kardo
       const userToken = jwtToken.sign({id: foundUser._id, role: foundUser.role}, secretKey);
       const userObj = foundUser.toObject();
       delete userObj.password;
     response.json({token: userToken, user: userObj, message: "andar aa "});
   }catch(error){ response.status(500).json({message: "masla ho gaya bhai"});}
}

const logoutUser = (request, response) => {
   // wese logout frontend pe token delete karne se hota hai
   // par inhonay rest api mangi thi tou route likhni par gayi
   response.json({message: "logout ho gaye aap, apna khayal rakhna, pls wapis na aana"});
}

const changePassword = async (request, response) => {
 try{
    // find then update, save karne mein alag maza hai compare to findByIdAndUpdate
     let foundUser = await userModel.findById(request.userData.id);
     if(foundUser.password !== request.body.oldPassword) {
         return response.status(400).json({message: "purana password to sahi daalo bhai kahan hai apka dimagh"});
     }
      foundUser.password = request.body.newPassword;
      await foundUser.save();
       response.json({message: "password change hogya party karo ab"});
 } catch(error){ response.status(500).json({message: "code urr gaya change pass me"}); }
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

module.exports = {registerUser, loginUser, logoutUser, changePassword, getAllUsers};