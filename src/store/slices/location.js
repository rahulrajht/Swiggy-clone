import { createSlice } from "@reduxjs/toolkit";

const location = createSlice({
    name: "location",
    initialState : {
        items: [],
        currentLocation:"",
        coord: {
            lat: 12.9715987,
            lng: 77.5945627
        },
    },
    reducers: {
        fetchLocation(state,  action)  {
            state.currentLocation = action.payload
        },
        fetchCoordinate(state , action) {
            state.coord = action.payload;
        }
    }
})

export const {fetchLocation , fetchCoordinate} = location.actions;
export default location.reducer;