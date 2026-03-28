import { createSlice } from '@reduxjs/toolkit';

const rideSlice = createSlice({
  name: 'rd',
  initialState: { rdList: [], myBks: [], reqRds: [] },
  reducers: 
  {
    addRd: (st, act) => 
    {
        // gari nikal aai hai, ride add kardo system me
      st.rdList.push({...act.payload, rId: Math.random().toString()});
    },
    bkSeat: (st, act) => 
    {
    // seat pakki ho rahi hai warna khare ho kr jana parega
      const r = st.rdList.find(x => x.rId === act.payload.rId);
      if(r && r.avlSts > 0) 
      {
        r.avlSts -= 1;
        st.myBks.push(act.payload);
      }
    },
    reqRd: (st, act) => 
    {
      // lift mangne walon ka record idhar hai lmao ghareeb
        st.reqRds.push(act.payload);
    }
  }
});

export const { addRd, bkSeat, reqRd } = rideSlice.actions;
export default rideSlice.reducer;