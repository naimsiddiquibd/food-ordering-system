import { createSlice } from "@reduxjs/toolkit";

// Helper function to calculate total price
const calculateTotalPrice = (item) => {
  const basePrice = item.price;
  const vanillaPrice = item.extras.vanilla ? item.extras.vanilla.quantity * item.extras.vanilla.price : 0;
  const chocolatePrice = item.extras.chocolate ? item.extras.chocolate.quantity * item.extras.chocolate.price : 0;
  return (basePrice + vanillaPrice + chocolatePrice) * item.quantity;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Array to store cart items
  },
  reducers: {
    // Add a new item to the cart or update the quantity if it already exists
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.cartItemId === newItem.cartItemId);

      if (existingItem) {
        // If the item already exists, update its quantity
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice = calculateTotalPrice(existingItem);
      } else {
        // Otherwise, add the new item to the cart
        state.items.push({
          ...newItem,
          totalPrice: calculateTotalPrice(newItem),
        });
      }
    },

    // Update the quantity of a specific item in the cart
    updateQuantity: (state, action) => {
      const { cartItemId, quantity } = action.payload;
      const item = state.items.find((item) => item.cartItemId === cartItemId);
      if (item) {
        item.quantity = quantity;
        item.totalPrice = calculateTotalPrice(item);
      }
    },

    // Update extras or special instructions for a specific item in the cart
    updateCartItem: (state, action) => {
      const { cartItemId, extras, specialInstructions } = action.payload;
      const item = state.items.find((item) => item.cartItemId === cartItemId);
      if (item) {
        if (extras) {
          item.extras = extras;
        }
        if (specialInstructions) {
          item.specialInstructions = specialInstructions;
        }
        item.totalPrice = calculateTotalPrice(item);
      }
    },

    // Remove an item from the cart
    removeFromCart: (state, action) => {
      const cartItemId = action.payload;
      state.items = state.items.filter((item) => item.cartItemId !== cartItemId);
    },

    // Clear all items from the cart
    clearCart: (state) => {
      state.items = [];
    },

    // Increment the quantity of an extra for a specific item
    incrementExtraQuantity: (state, action) => {
      const { cartItemId, extra } = action.payload;
      const item = state.items.find((item) => item.cartItemId === cartItemId);
      if (item && item.extras[extra]) {
        item.extras[extra].quantity += 1;
        item.totalPrice = calculateTotalPrice(item);
      }
    },

    // Decrement the quantity of an extra for a specific item
    decrementExtraQuantity: (state, action) => {
      const { cartItemId, extra } = action.payload;
      const item = state.items.find((item) => item.cartItemId === cartItemId);
      if (item && item.extras[extra] && item.extras[extra].quantity > 0) {
        item.extras[extra].quantity -= 1;
        item.totalPrice = calculateTotalPrice(item);
      }
    },

    // Remove an extra from a specific item
    removeExtra: (state, action) => {
      const { cartItemId, extra } = action.payload;
      const item = state.items.find((item) => item.cartItemId === cartItemId);
      if (item && item.extras[extra]) {
        item.extras[extra] = false; // Remove the extra
        item.totalPrice = calculateTotalPrice(item);
      }
    },
  },
});

// Export actions
export const {
  addToCart,
  updateQuantity,
  updateCartItem,
  removeFromCart,
  clearCart,
  incrementExtraQuantity,
  decrementExtraQuantity,
  removeExtra,
} = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;