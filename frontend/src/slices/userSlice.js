import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUserApi, loginUserApi, fetchAllUsersApi, approveCaptainApi } from '../services/api';


const savedToken = localStorage.getItem('token');
const savedUser = localStorage.getItem('user');

export const registerUser = createAsyncThunk(
  'usr/registerUser',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'usr/loginUser',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const fetchAllUsers = createAsyncThunk(
  'usr/fetchAllUsers',
  async (token, { rejectWithValue }) => {
    try { return await fetchAllUsersApi(token); } 
    catch (error) { return rejectWithValue(error.message); }
  }
);

export const approveCaptain = createAsyncThunk(
  'usr/approveCaptain',
  async ({ userId, token }, { rejectWithValue }) => {
    try { return await approveCaptainApi(userId, token); } 
    catch (error) { return rejectWithValue(error.message); }
  }
);

const userSlice = createSlice({
  name: 'usr',
  initialState: {
    currUsr: savedUser ? JSON.parse(savedUser) : null,
    token: savedToken || null,
    usrList: [], 
    status: 'idle',
    error: null,
    message: null
  },
  reducers: {
    doOut: (state) => {
      state.currUsr = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    chgPwd: (state, action) => {
      if (state.currUsr) {
        state.currUsr.password = action.payload;
      }
    },
    updtProf: (state, action) => {
      if (state.currUsr) {
        state.currUsr.userName = action.payload;
        localStorage.setItem('user', JSON.stringify(state.currUsr));
      }
    },
    reqCapt: (state, action) => {
      if (state.currUsr) {
        state.currUsr.captPending = true;
        state.currUsr.vehDeets = action.payload.veh;
        state.currUsr.plate = action.payload.plate;
        state.currUsr.color = action.payload.color;
        state.currUsr.idPic = action.payload.idPic;
        state.currUsr.licPic = action.payload.licPic;
        localStorage.setItem('user', JSON.stringify(state.currUsr));
      }
    },
    aprCapt: (state, action) => {
      if (state.currUsr && state.currUsr.email === action.payload) {
        state.currUsr.captPending = false;
        state.currUsr.isCapt = true;
        state.currUsr.role = 'captain';
        localStorage.setItem('user', JSON.stringify(state.currUsr));
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currUsr = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.usrList = action.payload; 
      })
      .addCase(approveCaptain.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const index = state.usrList.findIndex(u => u._id === updatedUser._id);
        if(index !== -1) {
            state.usrList[index] = updatedUser;
        }
      });
  }
});

export const { doOut, chgPwd, updtProf, reqCapt, aprCapt } = userSlice.actions;
export default userSlice.reducer;
