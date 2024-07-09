import { PayloadAction, SerializedError, Slice, SliceCaseReducers, SliceSelectors } from "@reduxjs/toolkit";
import { AuthState, BooksState } from "./states";
import { IBooks, IType, IUser } from "../../types/stateTypes";

export type UserAction = PayloadAction<IUser, string, {
    arg: IType;
    requestId: string;
    requestStatus: "fulfilled";
}, never>

export type RejectedAction = PayloadAction<
  unknown, string, never, SerializedError
>

export type AuthSlice = Slice<
  AuthState,
  SliceCaseReducers<AuthState>,
  string,
  string,
  SliceSelectors<AuthState>
>;

export type BooksSlice = Slice<
  BooksState,
  SliceCaseReducers<BooksState>,
  string,
  string,
  SliceSelectors<BooksState>
>;

export type BookAction = PayloadAction<IBooks, string, {
  arg: void;
  requestId: string;
  requestStatus: "fulfilled";
}, never>

