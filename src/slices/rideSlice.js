import { createSlice } from '@reduxjs/toolkit';

const rideSlice = createSlice({
  name: 'rd',
  initialState: { rdList: [], myBks: [], reqRds: [], chats: [] },
  reducers: {
    addRd: (st, act) => {
        // Captains drop pins for their starting point and planned route[cite: 2]
      st.rdList.push({...act.payload, rId: Math.random().toString(), passngrs: 0, actv: true});
    },
    bkSeat: (st, act) => {
      const r = st.rdList.find(x => x.rId === act.payload.rId);
      if(r && r.avlSts > 0) {
        r.avlSts -= 1;
        r.passngrs += 1;
        st.myBks.push(act.payload);
      }
    },
    reqRd: (st, act) => {
        // Passenger "Request" Pins: Passengers drop a pin on their home location[cite: 2]
        st.reqRds.push(act.payload);
    },
    // A chat module for Captains to coordinate with multiple passengers[cite: 2]
    sndMsg: (st, act) => {
        st.chats.push(act.payload);
    },

    // Add this right below sndMsg
    endRide: (st, act) => {
        const r = st.rdList.find(x => x.rId === act.payload);
        if(r) {
            r.actv = false;
        }
    }
  }
});

export const { addRd, bkSeat, reqRd, sndMsg, endRide } = rideSlice.actions;
export default rideSlice.reducer;