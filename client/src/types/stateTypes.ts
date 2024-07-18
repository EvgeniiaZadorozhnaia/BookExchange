export interface IInputs {
  username: string;
  email: string;
  password: string;
  city: string;
  placeOfMeeting: string;
  avatarUrl: string;
}

export interface IInputsBookCreationState {
  title: string ;
  author: string;
  pages: string;
}

export interface IUser {
  isAdmin: boolean;
  isBlocked: boolean;
  id: number;
  username: string;
  email: string;
  password: string;
  avatarUrl: string;
  rating: number;
  numberOfRating?: number;
  placeOfMeeting?: string;
  city: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IBook {
  Owner: Owner;
  id: number;
  ownerId: number;
  title: string;
  author: string;
  pages: number;
  rating: number;
  pictureUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITypeBook {
  inputs: IInputs;
  type: string;
}

export interface ITypeUser {
  type: string;
  formData: FormData;
}

export type IBooks = IBook[];

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
}

export interface Message {
  id?: number;
  text: string;
  authorId: number | undefined;
  toUser: number;
  exchangeId: number;
  createdAt: string;
  Author: {
    username: string;
    avatarUrl: string | undefined;
    createdAt: string;
  };
}

export interface Exchange {
  BookFromAuthor: any;
  status: string;
  id: number;
  Author: {
    id: number;
    username: string;
  };
  Reciever: {
    id: number;
    username: string;
  };
}

export interface IWeather {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  dt_txt: string;
}

export interface Owner {
  avatarUrl: string;
  city: string;
  createdAt: string;
  email: string;
  id: number;
  numberOfRating: number;
  password: string;
  placeOfMeeting: string;
  rating: number;
  updatedAt: string;
  username: string;
}

export interface BookWithOwner {
  Owner: Owner;
  author: string;
  createdAt: string;
  id: number;
  numberOfRating: number;
  ownerId: number;
  pages: number;
  pictureUrl: string;
  rating: number;
  title: string;
  updatedAt: string;
}

export interface formDataForBook {
  title: string;
  author: string;
  pages: number;
  frontpage: string;
}

export interface formDataForUser {
  username: string;
  email: string;
  password: string;
  city: string;
  placeOfMeeting: string;
  avatarUrl: string
}

export interface IReview {
  id: number;
  User: IUser;
  bookId: number;
  content: string;
  dislikes: number;
  likes: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export type IReviews = IReview[];

export interface IUserWithComments {
  createdAt: string;
  email: string;
  id: number;
  isBlocked: boolean;
  rating: number | null;
  username: string;
  reviews: IReview[];
}
