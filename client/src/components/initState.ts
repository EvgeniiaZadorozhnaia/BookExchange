import { IBook, IInputsBookCreationState } from "./../types/stateTypes";
import { IInputs, IUser } from "../types/stateTypes";

export const InputsState: IInputs = {
  username: "",
  email: "",
  password: "",
  city: "",
  placeOfMeeting: "",
  avatarUrl: "",
};

export const UserState: IUser = {
  id: 0,
  username: "",
  email: "",
  password: "",
  avatarUrl: "",
  rating: 0,
  numberOfRating: 0,
  placeOfMeeting: "",
  city: "",
  createdAt: "",
  updatedAt: "",
  isAdmin: false,
  isBlocked: false,
};

export const BookState: IBook = {
  Owner: {
    id: 0,
    username: "",
    email: "",
    password: "",
    avatarUrl: "",
    rating: 0,
    numberOfRating: 0,
    placeOfMeeting: "",
    city: "",
    createdAt: "",
    updatedAt: "",
    isAdmin: false,
    isBlocked: false,
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
};

export const InputsBookCreationState: IInputsBookCreationState = {
  title: "",
  author: "",
  pages: 0,
  pictureUrl: "",
};
