import { IBook, IUser } from "../../types/stateTypes"

export type AuthState = {
    user: IUser,
    loading: boolean,
    error: object
}

export type UsersState = {
    users: IUser[],
    loading: boolean,
    error: object
}

export type BooksState = {
    books: IBook[],
    loading: boolean,
    error: object,
    book: IBook
}