import { createSlice } from "@reduxjs/toolkit";

const sliceConfig = {
  name: "restaurantView",
  initialState: { view: false },
  reducers: {
    setRestaurantView: (state, action) => {
      state.view = true;
    },
    setClientView: (state, action) => {
      state.view = false;
    },
  },
};

const restaurantViewSlice = createSlice(sliceConfig);

export const { setRestaurantView, setClientView } = restaurantViewSlice.actions;

export default restaurantViewSlice.reducer;
