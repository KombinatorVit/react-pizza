import { configureStore } from '@reduxjs/toolkit'
import filter from "./slices/filterSlice";
import cart from "./slices/cartSlice";

export default configureStore({
    reducer: {
        filter,
        cart
    }
})