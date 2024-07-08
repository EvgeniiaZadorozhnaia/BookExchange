import { PayloadAction, SerializedError, Slice, SliceCaseReducers, SliceSelectors } from "@reduxjs/toolkit";
import { AuthState, UsersState } from "./states";
import { IUser } from "../../types/stateTypes";

export type UserAction = PayloadAction<IUser, string, {
    arg: void;
    requestId: string;
    requestStatus: "fulfilled";
}, never>

export type RejectedAction = PayloadAction<unknown, string, {
    arg: void;
    requestId: string;
    requestStatus: "rejected";
    aborted: boolean;
    condition: boolean;
} & ({
    rejectedWithValue: true;
} | ({
    rejectedWithValue: false;
} & object)), SerializedError>

export type AuthSlice = Slice<
  AuthState,
  SliceCaseReducers<AuthState>,
  string,
  string,
  SliceSelectors<AuthState>
>;

export type UsersSlice = Slice<
  UsersState,
  SliceCaseReducers<UsersState>,
  string,
  string,
  SliceSelectors<UsersState>
>;
