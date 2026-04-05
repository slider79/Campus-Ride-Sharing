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
      // Mandatory signup using university email credentials
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
    // Captain Registration portal logic
    reqCapt: (st, act) => {
        if(st.currUsr) {
            st.currUsr.captPending = true;
            st.currUsr.vehDeets = act.payload.veh; // upload vehicle details[cite: 2]
            st.currUsr.idPic = act.payload.idPic; // upload student IDs[cite: 2]
            const i = st.usrList.findIndex(u => u.eml === st.currUsr.eml);
            if(i > -1) {
                st.usrList[i].captPending = true;
                st.usrList[i].vehDeets = act.payload.veh;
            }
        }
    },
    // Admin Approval Dashboard logic[cite: 2]
    aprCapt: (st, act) => {
        const i = st.usrList.findIndex(u => u.eml === act.payload);
        if(i > -1) {
            st.usrList[i].captPending = false;
            st.usrList[i].isCapt = true; // manual approval before hosting rides[cite: 2]
            st.usrList[i].role = 'captain';
        }
    }
  }
});

export const { regUsr, doLog, doOut, chgPwd, reqCapt, aprCapt } = userSlice.actions;
export default userSlice.reducer;