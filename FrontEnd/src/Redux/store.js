import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Slices/cartSlice";
import restaurantViewSlice from "./Slices/restaurantViewSlice";

const store = configureStore({
    reducer:{
        cart:cartSlice,
        restaurantView:restaurantViewSlice
    }
});

export default store;