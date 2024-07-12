import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import booksSlice from './slices/booksSlice';



const storeOptions = {
  reducer: {
    authSlice,
    booksSlice
  }
}

export const store = configureStore(storeOptions)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch