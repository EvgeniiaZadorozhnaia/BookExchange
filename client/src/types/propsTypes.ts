import { Dispatch, RefObject, SetStateAction } from "react";
import {
  CalendarEvent,
  Exchange,
  formData,
  IBook,
  IBooks,
  IInputsBookCreationState,
  IReviews,
} from "./stateTypes";

export interface AuthFormProps {
  title: string;
  type: "signin" | "signup";
}

export interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  error: string;
}

export interface Book {
  book: IBook;
}

export interface displayedBooks {
  books: IBooks;
}

export interface SearchInputType {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  setSelectedCity: Dispatch<SetStateAction<string>>;
  setOptions: Dispatch<SetStateAction<string[]>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  options: string[];
}

export interface SidebarProps {
  events: CalendarEvent[];
}

export interface SidebarEventProps {
  event: CalendarEvent;
}

export interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  exchangeHistoryIncoming: Exchange[] | undefined;
  exchangeHistoryOutcoming: Exchange[] | undefined;
  activeStatusIncomeExchange: Exchange[] | undefined;
  activeStatusOutcomeExchange: Exchange[] | undefined;
}

export interface createBookProps {
  ownerId: number;
  formData: formData;
}

export interface editBookProps {
  bookId: number;
  formData: formData;
}

export interface deleteBookProps {
  bookId: number;
  userId: number;
}

export interface cardInfoProps {
  book: IBook;
  description: string;
}

export interface reviewsProps {
  book: IBook;
  reviews: IReviews;
  setReviews: Dispatch<SetStateAction<IReviews>>;
  setBook: React.Dispatch<React.SetStateAction<IBook>>;
}

export interface CreateBookFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialRef: RefObject<HTMLElement>;
  finalRef: RefObject<HTMLElement>;
  inputsHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
  inputs: IInputsBookCreationState;
  setImg: Dispatch<SetStateAction<File | null>>;
}
