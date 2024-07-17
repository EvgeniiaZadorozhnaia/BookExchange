import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosInstance, { setAccessToken } from "../axiosInstance";
import { IBooks, IUser } from "../types/stateTypes";
import {
  addFavorite,
  BookDelete,
  BookEdit,
  bookGetting,
  delBook,
  FavoriteBook,
  getMyBooks,
  newBook,
  newLogout,
  NewUser,
  refreshTokenI,
} from "./types/thunk";
import {
  createBookProps,
  deleteBookProps,
  editBookProps,
} from "../types/propsTypes";

const { VITE_API, VITE_BASE_URL }: ImportMeta["env"] = import.meta.env;

export const addUser: NewUser = createAsyncThunk(
  "users/create",
  async ({ type, formData }) => {
    const res: AxiosResponse = await axiosInstance.post(
      `${VITE_BASE_URL}${VITE_API}/auth/${type}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const data = res.data.user as IUser;
    setAccessToken(res.data.accessToken);
    return data;
  }
);

export const signIn: NewUser = createAsyncThunk(
  "users/signIn",
  async ({ type, inputs }) => {
    const res: AxiosResponse = await axiosInstance.post(
      `${VITE_BASE_URL}${VITE_API}/auth/${type}`,
      inputs,
    );
    console.log("data", res.data);
    const data = res.data.user as IUser;
    setAccessToken(res.data.accessToken);
    return data;
  }
);




export const refreshToken: refreshTokenI = createAsyncThunk(
  "auth/refreshToken",
  async () => {
    const response: AxiosResponse = await axiosInstance.get(
      `${VITE_BASE_URL}${VITE_API}/tokens/refresh`
    );
    setAccessToken(response.data.accessToken);
    return response.data.user as IUser;
  }
);

export const logoutUser: newLogout = createAsyncThunk(
  "users/logout",
  async () => {
    const res: AxiosResponse = await axiosInstance.get(
      `${VITE_BASE_URL}${VITE_API}/auth/logout`
    );
    if (res.status === 200) {
      setAccessToken("");
    }
  }
);

export const getBooks: bookGetting = createAsyncThunk(
  "books/getting",
  async () => {
    const res: AxiosResponse = await axiosInstance.get(
      `${VITE_BASE_URL}${VITE_API}/books/`
    );
    const data = res.data as IBooks[];

    return data;
  }
);

export const getBooksByUser: getMyBooks = createAsyncThunk(
  "books/getAllByUser",
  async (ownerId: number) => {
    const res: AxiosResponse = await axiosInstance.get(
      `${VITE_BASE_URL}${VITE_API}/books/${ownerId}`
    );
    const data = res.data as IBooks[];

    return data;
  }
);

export const deleteBook: delBook = createAsyncThunk(
  "books/delete",
  async (bookId: number) => {
    const res: AxiosResponse = await axiosInstance.delete(
      `${VITE_BASE_URL}${VITE_API}/books/${bookId}`
    );
    if (res.status === 204) {
      return bookId;
    }
  }
);

export const createBook: newBook = createAsyncThunk(
  "books/create",
  async ({ ownerId, formData }: createBookProps) => {
    const res = await axiosInstance.post(
      `${VITE_BASE_URL}${VITE_API}/books/${ownerId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const data = res.data.book;
    return data;
  }
);

export const editBook: BookEdit = createAsyncThunk(
  "books/edit",
  async ({ bookId, formData }: editBookProps) => {
    const res: AxiosResponse = await axiosInstance.put(
      `${VITE_BASE_URL}${VITE_API}/books/${bookId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const data = res.data;
    return data;
  }
);

export const getFavoriteBooks: FavoriteBook = createAsyncThunk(
  "favorite/getting",
  async (userId: number) => {
    const res: AxiosResponse = await axiosInstance.get(
      `${VITE_BASE_URL}${VITE_API}/favorite/${userId}`
    );
    const data = res.data as IBooks[];

    return data;
  }
);

export const deleteBookFromFavorites: BookDelete = createAsyncThunk(
  "favorite/delete",
  async ({ bookId, userId }: deleteBookProps) => {
    const res: AxiosResponse = await axiosInstance.delete(
      `${VITE_BASE_URL}${VITE_API}/favorite/${userId}/${bookId}`
    );
    if (res.status === 204) {
      return bookId;
    }
  }
);

export const addToFavorite: addFavorite = createAsyncThunk(
  "favorite/add",
  async ({ bookId, userId }: deleteBookProps) => {
    const res: AxiosResponse = await axiosInstance.post(
      `${VITE_BASE_URL}${VITE_API}/favorite`,
      { bookId, userId }
    );
    const data = res.data;
    return data;
  }
);
