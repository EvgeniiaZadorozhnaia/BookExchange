import { Dispatch, SetStateAction } from "react";
import { CalendarEvent, Exchange, IBook, IBooks } from "./stateTypes";

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