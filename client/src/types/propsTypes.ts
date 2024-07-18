import { Dispatch, RefObject, SetStateAction } from "react";
import {
  CalendarEvent,
  Exchange,
  IBook,
  IBooks,
  IInputsBookCreationState,
  IReviews,
  IUserWithComments,
  IWeather,
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

export interface BookProps {
  book: IBook;
  isForExchange: boolean;
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
  formData: FormData;
}

export interface editBookProps {
  bookId: number;
  formData: FormData;
}

export interface deleteBookProps {
  bookId: number | undefined;
  userId: number | undefined;
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
  onOpen: () => void;
  initialRef: RefObject<HTMLElement>;
  finalRef: RefObject<HTMLElement>;
  inputsHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
  inputs: IInputsBookCreationState;
  setInputs: React.Dispatch<React.SetStateAction<IInputsBookCreationState>>
  setImg: React.Dispatch<React.SetStateAction<string | null>>;
  img: string | null
}

export interface adminPageProps {
  usersWithComments: IUserWithComments[];
  setUsersWithComments: Dispatch<SetStateAction<IUserWithComments[]>>;
}

export type homePageProps = Omit<adminPageProps, 'setUsersWithComments'>;

export interface starProps {
  filled: boolean;
  partial: number;
}

export interface OneDayWeather {
  day: IWeather
}

export interface bookOnDeleteProps {
  book: IBook;
  onDelete: (bookId: number) => void;
}

export interface OneCardForMyBooksProps {
  book: IBook;
  onEditClick: (book: IBook) => void;
  onDelete: (bookId: number) => void;
}