import { IBook, IBook2, IInputsBookCreationState } from "./../types/stateTypes";
import { IInputs, IUser } from "../types/stateTypes";

export const InputsState: IInputs = {
  username: "",
  email: "",
  password: "",
};

export const UserState: IUser = {
  id: 0,
  username: "",
  email: "",
  password: "",
  avatarUrl: "",
  rating: 0,
  placeOfMeeting: "",
  city: "",
  createdAt: "",
  updatedAt: "",
};

export const BookState: IBook = {
  User: {city: ''},
  id: 0,
  ownerId: 0,
  title: "",
  author: "",
  pages: 0,
  rating: 0,
  pictureUrl: "",
  createdAt: "",
  updatedAt: "",
};

export const InputsBookCreationState: IInputsBookCreationState = {
  title: "",
  author: "",
  pages: 0,
  pictureUrl: "",
};

