export interface IInputs {
    username?: string,
    email: string,
    password: string,
  }

export interface IUser {
    id: number,
    username: string,
    email: string,
    score: number,
    password: string,
    createdAt: string,
    updatedAt: string
}

export interface IBook {
    id: number,
    title: string,
    author: string,
    pages: number,
    createdAt: string,
    updatedAt: string
}

export interface IType {
    inputs: IInputs
    type: string;
  }

export type IBooks = IBook[]


