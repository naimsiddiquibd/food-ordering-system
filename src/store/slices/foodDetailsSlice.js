import { createSlice } from "@reduxjs/toolkit";

const foodDetailsSlice = createSlice({
  name: "foodDetails",
  initialState: {
    details: null, // Stores the selected food item's details
  },
  reducers: {
    setFoodDetails: (state, action) => {
      state.details = action.payload; // Set the selected item's details
    },
    clearFoodDetails: (state) => {
      state.details = null; // Clear the details when the modal is closed
    },
  },
});

export const { setFoodDetails, clearFoodDetails } = foodDetailsSlice.actions;
export default foodDetailsSlice.reducer;