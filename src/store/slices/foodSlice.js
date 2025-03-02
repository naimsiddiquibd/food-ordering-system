import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  popularItems: [],
  fanFavorites: [],
  allItems: [],
}

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    setPopularItems: (state, action) => {
      state.popularItems = action.payload
    },
    setFanFavorites: (state, action) => {
      state.fanFavorites = action.payload
    },
    setAllItems: (state, action) => {
      state.allItems = action.payload
    },
  },
})

export const { setPopularItems, setFanFavorites, setAllItems } = foodSlice.actions
export default foodSlice.reducer

