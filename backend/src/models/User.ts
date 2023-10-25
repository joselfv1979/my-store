export interface IUser {
    id: string
    fullname: string;
    username: string;
    email: string;
    password: string;
    roles: string[];
    image: string;
  }

export type UserWithoutId = Omit<IUser, "id">