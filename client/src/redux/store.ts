import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';


const storeOptions = {
  reducer: {
    authSlice
  }
}

export const store = configureStore(storeOptions)

export type RootState = ReturnType<typeof store.getState>


export type AppDispatch = typeof store.dispatch