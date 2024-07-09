import { ActionReducerMapBuilder, createSlice, Draft } from "@reduxjs/toolkit";
import { BooksState } from "../types/states";
import { getBooks } from "../thunkActions";
import { BookAction, BooksSlice, RejectedAction } from "../types/reducers";

const initialState: BooksState = { books: [], loading: true, error: {} };

const booksSlice: BooksSlice = createSlice({
  name: "booksSlice",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<BooksState>): void => {
    builder.addCase(getBooks.pending, (state: Draft<BooksState>): void => {
      state.loading = true;
    });
    builder.addCase(
      getBooks.fulfilled,
      (state: Draft<BooksState>, action: BookAction): void => {
        state.books = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(
      getBooks.rejected,
      (state: Draft<BooksState>, action: RejectedAction): void => {
        console.log("Книги не найдены", action.error);
        state.error = action.error;
        state.loading = false;
      }
    );
  },
});


export default booksSlice.reducer;