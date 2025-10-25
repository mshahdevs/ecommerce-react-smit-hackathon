import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.id === item.id);

      if (existItem) {
        existItem.qty += 1;
      } else {
        state.cartItems.push({ ...item, qty: 1 });
      }

      state.totalQuantity += 1;
      state.totalPrice += item.price;
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems.find((x) => x.id === itemId);
      if (item) {
        state.totalQuantity -= item.qty;
        state.totalPrice -= item.price * item.qty;
        state.cartItems = state.cartItems.filter((x) => x.id !== itemId);
      }
    },
    increaseQty: (state, action) => {
      const item = state.cartItems.find((x) => x.id === action.payload);
      if (item) {
        item.qty += 1;
        state.totalQuantity += 1;
        state.totalPrice += item.price;
      }
    },
    decreaseQty: (state, action) => {
      const item = state.cartItems.find((x) => x.id === action.payload);
      if (item && item.qty > 1) {
        item.qty -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= item.price;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
