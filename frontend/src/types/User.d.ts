export interface UserState {
  users: User[];
  user: User;
  loggedUser?: User;
  message?: string;
  error?: string;
  loading: boolean;
}

export interface User {
  id?: string;
  username: string;
  fullname: string;
  password: string;
  roles: string[];
  email: string;
  token?: string;
  image?: string;
}

export const initialUser: User = {
  username: "",
  fullname: "",
  password: "",
  roles: ["user"],
  email: "",
};

export interface AuthRequest {
  username: string;
  password: string;
}
