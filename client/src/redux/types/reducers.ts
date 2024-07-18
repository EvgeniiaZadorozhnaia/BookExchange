import { PayloadAction, SerializedError, Slice, SliceCaseReducers, SliceSelectors } from "@reduxjs/toolkit";
import { AuthState, BooksState } from "./states";
import { IBooks, ITypeBook, ITypeUser, IUser } from "../../types/stateTypes";
import { deleteBookProps } from "../../types/propsTypes";

export type UserAction = PayloadAction<IUser, string, {
    arg: ITypeUser | void | ITypeBook;
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

export type BookAction = PayloadAction<IBooks[], string, {
  arg: number | void ;
  requestId: string;
  requestStatus: "fulfilled";
} & {
  requestId: string;
  requestStatus: "fulfilled";
}, never>

export type DeleteBookAction = PayloadAction<number | undefined, string, {
  arg: deleteBookProps | number;
  requestId: string;
  requestStatus: "fulfilled";
} & {
  requestId: string;
  requestStatus: "fulfilled";
}, never>

export type AddBookToFavorite = PayloadAction<number, string, {
  arg: deleteBookProps;
  requestId: string;
  requestStatus: "fulfilled";
} & {
  requestId: string;
  requestStatus: "fulfilled";
}, never>





