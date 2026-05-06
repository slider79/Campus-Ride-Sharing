import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRidesApi, fetchRideDetailsApi, postRideApi, bookSeatApi, fetchMyBookingsApi, getMyRidesApi, postRideRequestApi, fetchAllRequestsApi } from '../services/api';

export const fetchRides = createAsyncThunk(
  'rd/fetchRides',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchRidesApi();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRideDetails = createAsyncThunk(
  'rd/fetchRideDetails',
  async (rideId, { rejectWithValue }) => {
    try {
      return await fetchRideDetailsApi(rideId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postRide = createAsyncThunk(
  'rd/postRide',
  async ({ rideData, token }, { rejectWithValue }) => {
    try {
      return await postRideApi(rideData, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const bookSeat = createAsyncThunk(
  'rd/bookSeat',
  async ({ rideId, token }, { rejectWithValue }) => {
    try {
      return await bookSeatApi(rideId, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMyBookings = createAsyncThunk(
  'rd/fetchMyBookings',
  async (token, { rejectWithValue }) => {
    try {
      return await fetchMyBookingsApi(token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getMyRides = createAsyncThunk(
  'rd/getMyRides',
  async (token, { rejectWithValue }) => {
    try {
      return await getMyRidesApi(token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postRideRequest = createAsyncThunk(
  'rd/postRideRequest',
  async ({ payload, token }, { rejectWithValue }) => {
    try {
      return await postRideRequestApi(payload, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllRequests = createAsyncThunk(
  'rd/fetchAllRequests',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllRequestsApi();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const rideSlice = createSlice({
  name: 'rd',
  initialState: {
    rdList: [],
    myBks: [],
    myRides: [],
    reqRds: [],
    chats: [],
    selectedRide: null,
    status: 'idle',
    error: null
  },
  reducers: {
    clearSelectedRide: (state) => {
      state.selectedRide = null;
    },
    sndMsg: (state, action) => {
      state.chats.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRides.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRides.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rdList = action.payload;
      })
      .addCase(fetchRides.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchRideDetails.fulfilled, (state, action) => {
        state.selectedRide = action.payload;
      })
      .addCase(postRide.fulfilled, (state, action) => {
        state.rdList.push(action.payload);
      })
      .addCase(getMyRides.fulfilled, (state, action) => {
        state.myRides = action.payload;
      })
      .addCase(postRideRequest.fulfilled, (state, action) => {
        state.reqRds.push(action.payload);
      })
      .addCase(fetchAllRequests.fulfilled, (state, action) => {
        state.reqRds = action.payload;
      })
      .addCase(bookSeat.fulfilled, (state, action) => {
        const updated = action.payload;
        const ride = state.rdList.find((item) => item.rId === updated.rId);
        if (ride) {
          Object.assign(ride, updated);
        }
      })
      .addCase(fetchMyBookings.fulfilled, (state, action) => {
        state.myBks = action.payload;
      });
  }
});

export const { clearSelectedRide, sndMsg } = rideSlice.actions;
export default rideSlice.reducer;
