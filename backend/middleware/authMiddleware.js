const jwtToken = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET || 'babaKiRani';

 const checkAuth = (request, response, nextFunction) => {
   // header se uthao token
  let authToken = request.headers.authorization;
    if(!authToken) {
       return response.status(401).json({message: "Authentication required. Missing Authorization header."});
  }
   authToken = authToken.split(" ")[1]; // 'Bearer' lafaz hatao

   try{
    let decodedPayload = jwtToken.verify(authToken, secretKey);
     request.userData = decodedPayload; // request me payload latka do agay controllers me kaam ayega
    nextFunction();
   } catch(error) {
    return response.status(401).json({message: "Invalid or expired token."});
   }
};

module.exports = checkAuth;