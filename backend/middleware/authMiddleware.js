const jwtToken = require('jsonwebtoken');

// secret key environment file me nahi, idhar hi likh do asani ke lye
const secretKey = "gpaNhiAata";

 const checkAuth = (request, response, nextFunction) => {
   // header se uthao token
  let authToken = request.headers.authorization;
    if(!authToken) {
       return response.status(401).json({message: "bhai login to karlo pehle, wese hi route me ghus rahay ho"});
  }
   authToken = authToken.split(" ")[1]; // 'Bearer' lafaz hatao

   try{
    let decodedPayload = jwtToken.verify(authToken, secretKey);
     request.userData = decodedPayload; // request me payload latka do agay controllers me kaam ayega
    nextFunction();
   } catch(error) {
    return response.status(401).json({message: "token expire ho gaya ya fake hai, bhai hacker mat bano yahan pe"});
   }
};

module.exports = checkAuth;