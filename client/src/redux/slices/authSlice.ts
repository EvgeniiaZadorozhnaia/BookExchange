import { UserState } from './../../components/initState';
import { ActionReducerMapBuilder, Draft, createSlice } from "@reduxjs/toolkit"
import { AuthState } from "../types/states"
import { addUser, logoutUser } from '../thunkActions';
import { AuthSlice, RejectedAction, UserAction } from '../types/reducers';


const initialState: AuthState = { user: UserState, loading: true, error: {}}


const authSlice: AuthSlice = createSlice({
  name: 'authorizationSlice',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>): void => {
    builder.addCase(addUser.pending, (state: Draft<AuthState>): void => {
      state.loading = true;
    })
    builder.addCase(addUser.fulfilled, (state: Draft<AuthState>, action: UserAction): void => {
      state.user = action.payload
      state.loading = false;
    })
    builder.addCase(addUser.rejected, (state: Draft<AuthState>, action: RejectedAction): void => {
      console.log('Неправильно введены данные', action.error)
      state.error = action.error;
      state.loading = false;
    })
    builder.addCase(logoutUser.pending, (state: Draft<AuthState>): void => {
      state.loading = true;
    })
    builder.addCase(logoutUser.fulfilled, (state: Draft<AuthState>): void => {
      state.user = UserState;
      state.loading = false;
    })
    builder.addCase(logoutUser.rejected, (state: Draft<AuthState>, action: RejectedAction): void => {
      console.log('Ошибка добавления', action.error)
      state.error = action.error;
      state.loading = false;
    })
    
  }
})

export default authSlice.reducer;


