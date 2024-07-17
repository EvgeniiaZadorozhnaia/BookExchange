import { AsyncThunk, SerializedError } from "@reduxjs/toolkit"
import { IBook, IBooks, ITypeUser, IUser } from "../../types/stateTypes"
import { AppDispatch, RootState } from "../store"
import { createBookProps, deleteBookProps, editBookProps } from "../../types/propsTypes"

type AsyncThunkConfig = {
    /** return type for `thunkApi.getState` */
    state: RootState
    /** type for `thunkApi.dispatch` */
    dispatch: AppDispatch
    /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
    extra?: unknown
    /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
    rejectValue?: unknown
    /** return type of the `serializeError` option callback */
    serializedErrorType: SerializedError
    /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
    pendingMeta: {
      requestId: string
      requestStatus: "pending"
    }
    /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
    fulfilledMeta:{
      requestId: string
      requestStatus: "fulfilled"
    }
    /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
    rejectedMeta: {
      requestId: string
      rejectedWithValue: false
      requestStatus: "rejected"
      aborted: false
      condition: false
    }
  }

  export type creatingNewUser = AsyncThunk<IUser, void, AsyncThunkConfig>

  export type NewUser = AsyncThunk<IUser, ITypeUser, AsyncThunkConfig>

  export type newBook = AsyncThunk<IBook, createBookProps, AsyncThunkConfig>

  export type refreshTokenI = AsyncThunk<IUser, void, AsyncThunkConfig>

  export type newLogout = AsyncThunk<void, void, AsyncThunkConfig>

  export type bookGetting = AsyncThunk<IBooks[], void, AsyncThunkConfig>

  export type getMyBooks = AsyncThunk<IBooks[], number, AsyncThunkConfig>

  export type delBook = AsyncThunk<number | undefined, number, AsyncThunkConfig>

  export type BookEdit = AsyncThunk<IBook, editBookProps, AsyncThunkConfig>

  export type FavoriteBook = AsyncThunk<IBooks[], number, AsyncThunkConfig>

  export type BookDelete = AsyncThunk<number | undefined, deleteBookProps, AsyncThunkConfig>

  export type addFavorite = AsyncThunk<number, deleteBookProps, AsyncThunkConfig>