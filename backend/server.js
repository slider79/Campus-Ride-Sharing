const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
 const app = express();

  app.use(cors()); 
   app.use(express.json());

// db connect karna zaroori hai warna frontend walo (also me) ki mehnat zaya

mongoose.connect('mongodb://127.0.0.1:27017/campusRideDb')
.then(()=> console.log("db chal gaya shukar hai bhai"))
  .catch((error)=>console.log("db ka phadda", error))

// alag routes
const userRoutes = require('./routes/userRoutes');
 const rideRoutes = require('./routes/rideRoutes');

app.use('/api/users', userRoutes);
  app.use('/api/rides', rideRoutes);

app.listen(3001, () => {
 console.log("server ud raha hai port 3001 pe, Alhumdulillah");
});