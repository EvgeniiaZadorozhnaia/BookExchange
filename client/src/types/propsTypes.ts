import { IBook, IBooks } from "./stateTypes";

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
  displayedBooks: IBooks;
}