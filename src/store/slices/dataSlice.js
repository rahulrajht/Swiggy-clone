import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    restaurantDetails: [],
    itemDetails: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchStart(state) {
      state.isLoading = true;
    },

    fetchSuccess(state, action) {
      state.items = action.payload;
      state.isLoading = false;
    },

    fetchFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

    fetchRestaurantDetails(state , action) {
      state.restaurantDetails = action.payload;
      state.isLoading = false;
    }
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, fetchRestaurantDetails } = dataSlice.actions;
export default dataSlice.reducer;
