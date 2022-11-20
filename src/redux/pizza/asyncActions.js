import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus', async (params) => {
        const {sortBy, order, category, search, currentPage} = params;
        const {data} = await axios.get(`https://6369227915219b8496105d27.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`)


        return data;
    },
);