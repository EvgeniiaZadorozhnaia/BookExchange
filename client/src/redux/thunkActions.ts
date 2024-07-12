import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosInstance, { setAccessToken } from "../axiosInstance";
import {  IBooks, IType, IUser } from "../types/stateTypes";
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

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
 async () => {
   const response: AxiosResponse = await axiosInstance.get(`${VITE_BASE_URL}${VITE_API}/tokens/refresh`);
   setAccessToken(response.data.accessToken);
   return response.data.user as IUser;
 });
  

export const logoutUser = createAsyncThunk("users/logout", async () => {
  const res: AxiosResponse = await axiosInstance.get(
    `${VITE_BASE_URL}${VITE_API}/auth/logout`
  );
  if (res.status === 200) {
    setAccessToken(""); 
  }
});

export const getBooks = createAsyncThunk("books/getting", async () => {
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
    return bookId;
  }
});

export const createBook = createAsyncThunk(
  "books/create",
  async ({ ownerId, formData }) => {
    const res = await axiosInstance.post(
      `${VITE_BASE_URL}${VITE_API}/books/${ownerId}`, 
      formData, 
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    const data = res.data.book;
    return data;
  }
);

export const editBook = createAsyncThunk(
  "books/edit",
  async ({ bookId, formData }) => {
    const res: AxiosResponse = await axiosInstance.put(
      `${VITE_BASE_URL}${VITE_API}/books/${bookId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    const data = res.data;
    return data;
  }
);

export const getFavoriteBooks = createAsyncThunk(
  "favorite/getting",
  async (userId) => {
    const res: AxiosResponse = await axiosInstance.get(
      `${VITE_BASE_URL}${VITE_API}/favorite/${userId}`,
    );
    const data = res.data as IBooks[];

    return data;
  }
);

export const deleteBookFromFavorites = createAsyncThunk("favorite/delete", async ({bookId, userId}) => {
  const res: AxiosResponse = await axiosInstance.delete(
    `${VITE_BASE_URL}${VITE_API}/favorite/${userId}/${bookId}`
  );
  if (res.status === 204) {
    return bookId;
  }
});

export const addToFavorite = createAsyncThunk(
  "favorite/add",
  async ({ bookId, userId }) => {
    const res: AxiosResponse = await axiosInstance.post(
      `${VITE_BASE_URL}${VITE_API}/favorite`,
      { bookId, userId }
    );
    const data = res.data;
    return data;
  }
);
