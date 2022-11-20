import {configureStore} from '@reduxjs/toolkit'
import filter from "./filter/slice";
import cart from "./cart/slice";
import pizza from './pizza/slice'

export default configureStore({
    reducer: {
        filter,
        cart,
        pizza
    }
})