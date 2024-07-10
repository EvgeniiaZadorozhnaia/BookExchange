import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosInstance, { setAccessToken } from "../axiosInstance";
import { IBook, IBooks, IType, IUser } from "../types/stateTypes";
import { NewUser } from "./types/thunk";

const { VITE_API, VITE_BASE_URL }: ImportMeta["env"] = import.meta.env;

export const addUser: NewUser = createAsyncThunk(
  "users/create",
  async ({ type, inputs }: IType) => {
    const res: AxiosResponse = await axiosInstance.post(
      `${VITE_BASE_URL}${VITE_API}/auth/${type}`,
      inputs
    );
    const data = res.data.user as IUser;
    setAccessToken(res.data.accessToken);
    return data;
  }
);

export const logoutUser = createAsyncThunk("users/logout", async () => {
  const res: AxiosResponse = await axiosInstance.get(
    `${VITE_BASE_URL}${VITE_API}/auth/logout`
  );
  if (res.status === 200) {
    setAccessToken("");
  }
});

export const getBooks = createAsyncThunk("books/getting/getAll", async () => {
  const res: AxiosResponse = await axiosInstance.get(
    `${VITE_BASE_URL}${VITE_API}/books`
  );
  const data = res.data as IBooks[];

  return data;
});

export const getBooksByUser = createAsyncThunk(
  "books/getAllByUser",
  async (ownerId) => {
    const res: AxiosResponse = await axiosInstance.get(
      `${VITE_BASE_URL}${VITE_API}/books/${ownerId}`
    );
    const data = res.data as IBooks[];

    return data;
  }
);

export const deleteBook = createAsyncThunk("books/delete", async (bookId) => {
  const res: AxiosResponse = await axiosInstance.delete(
    `${VITE_BASE_URL}${VITE_API}/books/${bookId}`
  );
  if (res.status === 204) {
    return bookId
  }
});

export const createBook = createAsyncThunk(
  
  "books/create",
  async ({ ownerId, inputs }) => {
    const res: AxiosResponse = await axiosInstance.post(
      `${VITE_BASE_URL}${VITE_API}/books/${ownerId}`,
      inputs
    );
    const data = res.data.book as IBook;
    return data;
  }
);
