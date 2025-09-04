import { configureStore } from '@reduxjs/toolkit';
import { interventiSlice } from './Slices/interventiSlice.js';

export const store = configureStore({
    reducer: {
        interventi: interventiSlice.reducer
    }
});
