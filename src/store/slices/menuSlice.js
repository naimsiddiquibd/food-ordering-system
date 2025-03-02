import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  categories: [],
  selectedCategory: null,
  selectedSubcategory: null,
}

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
      state.selectedSubcategory = null
    },
    setSelectedSubcategory: (state, action) => {
      state.selectedSubcategory = action.payload
    },
  },
})

export const { setCategories, setSelectedCategory, setSelectedSubcategory } = menuSlice.actions
export default menuSlice.reducer

