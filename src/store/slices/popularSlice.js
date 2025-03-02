import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPopularItems = createAsyncThunk(
    'popular/fetchPopularItems',
    async (restaurantName, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://restaurantapi.fatmonk.studio/public/api/${restaurantName}/popular`);
            const data = await response.json();
            return data.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const popularSlice = createSlice({
    name: 'popular',
    initialState: {
        menuData: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPopularItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPopularItems.fulfilled, (state, action) => {
                state.loading = false;
                state.menuData = action.payload;
            })
            .addCase(fetchPopularItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default popularSlice.reducer;
