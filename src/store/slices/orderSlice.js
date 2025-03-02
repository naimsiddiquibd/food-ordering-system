import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  orderId: null,
  status: null,
}

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.orderId = action.payload.orderId
      state.status = action.payload.status
    },
    updateOrderStatus: (state, action) => {
      state.status = action.payload
    },
    clearOrder: (state) => {
      state.orderId = null
      state.status = null
    },
  },
})

export const { setOrder, updateOrderStatus, clearOrder } = orderSlice.actions
export default orderSlice.reducer

