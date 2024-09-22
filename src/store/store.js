import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import dataReducer from "./slices/dataSlice";
import locationReducer from "./slices/location";

const store = configureStore({
    reducer : {
        cart : cartReducer,
        data : dataReducer,
        location: locationReducer,
    }
});

export default store;