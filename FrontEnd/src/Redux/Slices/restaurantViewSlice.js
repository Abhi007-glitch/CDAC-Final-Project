import { createSlice } from "@reduxjs/toolkit";

const sliceConfig = {
  name: "restaurantView",
  initialState: { view: false, restId:null },
  reducers: {
    setRestaurantView: (state, action) => {
      state.view = true;
    },
    setClientView: (state, action) => {
      state.view = false;
    },
    setRestId :(state,action)=>{ 
      state.restId=action.payload.restId;
    },
    clearRestId:(state,action)=>{
      state.restId=null;
    }
  },
};

const restaurantViewSlice = createSlice(sliceConfig);

export const { setRestaurantView, setClientView ,setRestId , clearRestId} = restaurantViewSlice.actions;

export default restaurantViewSlice.reducer;
