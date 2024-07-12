export interface IInputs {
    username?: string,
    email: string,
    password: string,
  }

  export interface IInputsBookCreationState {
    title?: string,
    author?: string,
    pages?: number,
    pictureUrl?: string,
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
    User: {city: string},
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

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
}

export interface Message {
  id: number;
  text: string;
  authorId: number;
  toUser: number;
  exchangeId: number;
  createdAt: string;
  Author: {
    username: string;
    avatarUrl: string;
    createdAt: string;
  };
}

export interface Exchange {
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
  id: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  condition: string;
  description: string;
  Owner: Owner;
}
