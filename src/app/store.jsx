import { configureStore } from "@reduxjs/toolkit";
// 9- add the slice reducer to the store
import productsReducer from "../features/products/productsSlice";
export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});
