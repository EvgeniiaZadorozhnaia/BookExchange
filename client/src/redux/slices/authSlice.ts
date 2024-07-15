import { UserState } from "./../../components/initState";
import { ActionReducerMapBuilder, Draft, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/states";
import { addUser, logoutUser, refreshToken, sendMail } from "../thunkActions";
import { AuthSlice, RejectedAction, UserAction } from "../types/reducers";

const initialState: AuthState = { user: UserState, loading: true, error: {} };

const authSlice: AuthSlice = createSlice({
  name: "authorizationSlice",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>): void => {
    builder.addCase(addUser.pending, (state: Draft<AuthState>): void => {
      state.loading = true;
    });
    builder.addCase(
      addUser.fulfilled,
      (state: Draft<AuthState>, action: UserAction): void => {
        state.user = action.payload;
        state.loading = false;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    );
    builder.addCase(
      addUser.rejected,
      (state: Draft<AuthState>, action: RejectedAction): void => {
        console.log("Неправильно введены данные", action.error);
        state.error = action.error;
        state.loading = false;
      }
    );
    builder.addCase(refreshToken.pending, (state: Draft<AuthState>): void => {
      state.loading = true;
    });
    builder.addCase(
      refreshToken.fulfilled,
      (state: Draft<AuthState>, action: UserAction): void => {
        state.user = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(
      refreshToken.rejected,
      (state: Draft<AuthState>, action: RejectedAction): void => {
        console.log("Неправильно введены данные", action.error);
        state.error = action.error;
        state.loading = false;
      }
    );
    builder.addCase(logoutUser.pending, (state: Draft<AuthState>): void => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state: Draft<AuthState>): void => {
      state.user = UserState;
      state.loading = false;
    });
    builder.addCase(
      logoutUser.rejected,
      (state: Draft<AuthState>, action: RejectedAction): void => {
        console.log("Ошибка добавления", action.error);
        state.error = action.error;
        state.loading = false;
      }
    );
    // builder.addCase(sendMail.pending, (state: Draft<AuthState>): void => {
    //   state.loading = true;
    // });
    // builder.addCase(sendMail.fulfilled, (state: Draft<AuthState>): void => {
    //   state.user = UserState;
    //   state.loading = false;
    // });
    // builder.addCase(
    //   sendMail.rejected,
    //   (state: Draft<AuthState>, action: RejectedAction): void => {
    //     console.log("Ошибка добавления", action.error);
    //     state.error = action.error;
    //     state.loading = false;
    //   }
    // );
  },
});

export default authSlice.reducer;
