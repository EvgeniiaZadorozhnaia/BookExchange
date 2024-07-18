import {
  ActionReducerMapBuilder,
  createSlice,
  Draft,
  PayloadAction,
} from "@reduxjs/toolkit";
import { BooksState } from "../types/states";
import {
  addToFavorite,
  createBook,
  deleteBook,
  deleteBookFromFavorites,
  editBook,
  getBooks,
  getBooksByUser,
  getFavoriteBooks,
} from "../thunkActions";
import { AddBookToFavorite, BookAction, BooksSlice, DeleteBookAction, RejectedAction } from "../types/reducers";
import { IBook } from "../../types/stateTypes";

const initialState: BooksState = {
  books: [],
  loading: true,
  error: {},
  book: {
    Owner: {
      avatarUrl: "",
      city: "",
      createdAt: "",
      email: "",
      id: 0,
      numberOfRating: 0,
      password: "",
      placeOfMeeting: "",
      rating: 0,
      updatedAt: "",
      username: "",
    },
    id: 0,
    ownerId: 0,
    title: "",
    author: "",
    pages: 0,
    rating: 0,
    pictureUrl: "",
    createdAt: "",
    updatedAt: "",
  },
};

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
        console.log("state.books", state.books);
        // @ts-ignore 
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
    builder.addCase(
      getBooksByUser.pending,
      (state: Draft<BooksState>): void => {
        state.loading = true;
      }
    );
    builder.addCase(
      getBooksByUser.fulfilled,
      (state: Draft<BooksState>, action: BookAction): void => {
         // @ts-ignore 
        state.books = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(
      getBooksByUser.rejected,
      (state: Draft<BooksState>, action: RejectedAction): void => {
        console.log("Книги не найдены", action.error);
        state.error = action.error;
        state.loading = false;
      }
    );
    builder.addCase(deleteBook.pending, (state: Draft<BooksState>): void => {
      state.loading = true;
    });
    builder.addCase(
      deleteBook.fulfilled,
      (state, action: DeleteBookAction) => {
        state.books = state.books.filter((book) => book.id !== action.payload);
        state.loading = false;
      }
    );
    builder.addCase(
      deleteBook.rejected,
      (state: Draft<BooksState>, action: RejectedAction): void => {
        console.log("Ошибка удаления", action.error);
        state.error = action.error;
        state.loading = false;
      }
    );
    builder.addCase(createBook.pending, (state: Draft<BooksState>): void => {
      state.loading = true;
    });
    builder.addCase(
      createBook.fulfilled,
      (state: Draft<BooksState>, action: PayloadAction<IBook>): void => {
        state.books.push(action.payload);
        state.loading = false;
      }
    );
    builder.addCase(
      createBook.rejected,
      (state: Draft<BooksState>, action: RejectedAction): void => {
        console.log("Ошибка добавления", action.error);
        state.error = action.error;
        state.loading = false;
      }
    );
    builder.addCase(editBook.pending, (state: Draft<BooksState>): void => {
      state.loading = true;
    });
    builder.addCase(
      editBook.fulfilled,
      (state: Draft<BooksState>, action: PayloadAction<IBook>): void => {
        state.books = state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book
        );

        state.loading = false;
      }
    );
    builder.addCase(
      editBook.rejected,
      (state: Draft<BooksState>, action: RejectedAction): void => {
        console.log("Ошибка редактирования", action.error);
        state.error = action.error;
        state.loading = false;
      }
    );
    builder.addCase(
      getFavoriteBooks.pending,
      (state: Draft<BooksState>): void => {
        state.loading = true;
      }
    );
    builder.addCase(
      getFavoriteBooks.fulfilled,
      (state: Draft<BooksState>, action: BookAction): void => {
        // @ts-ignore 
        state.books = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(
      getFavoriteBooks.rejected,
      (state: Draft<BooksState>, action: RejectedAction): void => {
        console.log("Книги не найдены", action.error);
        state.error = action.error;
        state.loading = false;
      }
    );
    builder.addCase(
      deleteBookFromFavorites.pending,
      (state: Draft<BooksState>): void => {
        state.loading = true;
      }
    );
    builder.addCase(
      deleteBookFromFavorites.fulfilled,
      (state, action: DeleteBookAction) => {
        state.books = state.books.filter((book) => book.id !== action.payload);
        state.loading = false;
      }
    );
    builder.addCase(
      deleteBookFromFavorites.rejected,
      (state: Draft<BooksState>, action: RejectedAction): void => {
        console.log("Ошибка удаления", action.error);
        state.error = action.error;
        state.loading = false;
      }
    );
    builder.addCase(addToFavorite.pending, (state: Draft<BooksState>): void => {
      state.loading = true;
    });
    builder.addCase(
      addToFavorite.fulfilled,
      (state: Draft<BooksState>, action: AddBookToFavorite): void => {
        // @ts-ignore
        state.books.push(action.payload);
        state.loading = false;
      }
    );
    builder.addCase(
      addToFavorite.rejected,
      (state: Draft<BooksState>, action: RejectedAction): void => {
        console.log("Ошибка добавления", action.error);
        state.error = action.error;
        state.loading = false;
      }
    );
  },
});

export default booksSlice.reducer;
