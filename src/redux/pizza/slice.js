import {createSlice} from '@reduxjs/toolkit';
import {fetchPizzas} from "./asyncActions";

const initialState = {
    items: [],
    status: 'loading', // loading | success | error

};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading'
            state.items = []
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
        },
        [fetchPizzas.rejected]: (state, action) => {
            state.status = 'error'
            state.items = []
        }
    }
});

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;