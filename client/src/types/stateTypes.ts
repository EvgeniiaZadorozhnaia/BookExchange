export interface IInputs {
    username?: string,
    email: string,
    password: string,
  }

export interface IUser {
    id: number,
    username: string,
    email: string,
    password: string,
    avatarUrl: string,
    rating: number,
    placeOfMeeting: string,
    city: string,
    createdAt: string,
    updatedAt: string
}

export interface IBook {
    id: number,
    ownerId: number,
    title: string,
    author: string,
    pages: number,
    rating: number,
    pictureUrl: string,
    createdAt: string,
    updatedAt: string
}

export interface IType {
    inputs: IInputs
    type: string;
  }

export type IBooks = IBook[]


