import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./slices/cartSlice"
import foodReducer from "./slices/foodSlice"
import menuReducer from "./slices/menuSlice"
import userReducer from "./slices/userSlice"
import orderReducer from "./slices/orderSlice"
import restaurantSlice from "./slices/restaurantSlice"
import fanFavReducer from "./slices/fanFavSlice";
import popularReducer from "./slices/popularSlice";
import foodDetailsReducer from "./slices/foodDetailsSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    food: foodReducer,
    menu: menuReducer,
    user: userReducer,
    order: orderReducer,
    restaurant: restaurantSlice, 
    fanFav: fanFavReducer,
    popular: popularReducer,
    foodDetails: foodDetailsReducer,
  },
})

