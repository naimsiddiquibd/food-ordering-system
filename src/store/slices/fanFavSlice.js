import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// Fetch Fan Favorite menu data
export const fetchFanFav = createAsyncThunk(
  "fanFav/fetchFanFav",
  async (restaurantName, thunkAPI) => {
    try {
      const response = await api.get(`/${restaurantName}/fanfav`); // Use the Axios instance
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch fan favorites");
    }
  }
);

const fanFavSlice = createSlice({
  name: "fanFav",
  initialState: {
    menuData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFanFav.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFanFav.fulfilled, (state, action) => {
        state.loading = false;
        state.menuData = action.payload;
      })
      .addCase(fetchFanFav.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default fanFavSlice.reducer;