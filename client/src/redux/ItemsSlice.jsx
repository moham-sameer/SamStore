import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch all items
export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
    const response = await axios.get('http://localhost:5000/products');
    return response.data;
});
// https://fakestoreapi.com/products
// Async thunk to fetch a single item by ID
export const fetchItemById = createAsyncThunk('items/fetchItemById', async (id) => {
    const response = await axios.get(`http://localhost:5000/products/${id}`);
    return response.data;
});

const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        data: [],
        product: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle fetchItems
            .addCase(fetchItems.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Handle fetchItemById
            .addCase(fetchItemById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchItemById.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(fetchItemById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// Export only once
export default itemsSlice.reducer;
// export { fetchItems, fetchItemById }; // Ensure no duplicate exports
