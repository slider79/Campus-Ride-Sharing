import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'usr',
  initialState: 
  { 
      currUsr: null, 
      usrList: [{nm: 'Admin Boss', eml: 'admin@nu.edu.pk', pwd: 'admin', role: 'admin'}] // default admin 
  },
  reducers: {
    regUsr: (st, act) => 
        {
        st.usrList.push({...act.payload, role: 'passenger', isCapt: false, captPending: false});
    },
    doLog: (st, act) => {
      const fnd = st.usrList.find(u => u.eml === act.payload.eml && u.pwd === act.payload.pwd);
      if(fnd) {
         st.currUsr = fnd;
      }
    },
    doOut: (st) => {
      st.currUsr = null;
    },
    chgPwd: (st, act) => {
      if(st.currUsr) {
        st.currUsr.pwd = act.payload;
        const i = st.usrList.findIndex(u => u.eml === st.currUsr.eml);
        if(i > -1) st.usrList[i].pwd = act.payload;
      }
    },
    // New logic to update username
    updtProf: (st, act) => {
        if(st.currUsr) {
            st.currUsr.nm = act.payload;
            const i = st.usrList.findIndex(u => u.eml === st.currUsr.eml);
            if(i > -1) st.usrList[i].nm = act.payload;
        }
    },
    reqCapt: (st, act) => {
        if(st.currUsr) {
            st.currUsr.captPending = true;
            st.currUsr.vehDeets = act.payload.veh; 
            st.currUsr.plate = act.payload.plate; 
            st.currUsr.color = act.payload.color; 
            st.currUsr.idPic = act.payload.idPic; 
            st.currUsr.licPic = act.payload.licPic; 
            
            const i = st.usrList.findIndex(u => u.eml === st.currUsr.eml);
            if(i > -1) {
                st.usrList[i].captPending = true;
                st.usrList[i].vehDeets = act.payload.veh;
                st.usrList[i].plate = act.payload.plate;
                st.usrList[i].color = act.payload.color;
                st.usrList[i].idPic = act.payload.idPic;
                st.usrList[i].licPic = act.payload.licPic;
            }
        }
    },
    aprCapt: (st, act) => {
        const i = st.usrList.findIndex(u => u.eml === act.payload);
        if(i > -1) {
            st.usrList[i].captPending = false;
            st.usrList[i].isCapt = true; 
            st.usrList[i].role = 'captain';
        }
    }
  }
});

export const { regUsr, doLog, doOut, chgPwd, updtProf, reqCapt, aprCapt } = userSlice.actions;
export default userSlice.reducer;