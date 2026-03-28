import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'usr',
  initialState: { currUsr: null, usrList: [] },
  reducers: 
  {
    regUsr: (st, act) => 
    {
      // naya launda register karo database bharne do
        st.usrList.push(act.payload);
    },
    doLog: (st, act) => 
    {
    // details check karo aur login karao agar sahi hain
      const fnd = st.usrList.find(u => u.eml === act.payload.eml && u.pwd === act.payload.pwd);
      if(fnd) 
      {
         st.currUsr = fnd;
      }
    },
    doOut: (st) => 
    {
      // session khatam banda nikal gaya rip
      st.currUsr = null;
    },
    chgPwd: (st, act) => 
    {
        // password badal raha hai bhai security tight hai
      if(st.currUsr) 
      {
        st.currUsr.pwd = act.payload;
        const i = st.usrList.findIndex(u => u.eml === st.currUsr.eml);
        if(i > -1) st.usrList[i].pwd = act.payload;
      }
    }
  }
});

export const { regUsr, doLog, doOut, chgPwd } = userSlice.actions;
export default userSlice.reducer;