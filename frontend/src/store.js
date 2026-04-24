import { configureStore } from '@reduxjs/toolkit';
import usrReducer from './slices/userSlice';
import rdReducer from './slices/rideSlice';

// store set ho gaya, all data will be dropped here
export const store = configureStore
({
  reducer: 
  {
    usr: usrReducer,
    rd: rdReducer
  }
});