import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching restaurant info dynamically
export const fetchRestaurantInfo = createAsyncThunk(
  "restaurant/fetchRestaurantInfo",
  async (restaurantName, thunkAPI) => {
    try {
      const response = await fetch(
        `https://restaurantapi.fatmonk.studio/public/api/${restaurantName}`
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch restaurant info");
    }
  }
);

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: {
    resInfo: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurantInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.resInfo = action.payload;
      })
      .addCase(fetchRestaurantInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default restaurantSlice.reducer;
