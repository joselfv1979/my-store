export interface UserState {
  users: User[];
  user: User | null;
  authUser?: AuthUser;
  message?: string;
  error?: string;
  status: 'loading' | 'idle' | 'success' | 'fail';
}

export interface User extends AuthUser {
  fullname: string;
  password: string;
  email: string;
  image?: string;
}

export interface AuthUser {
  id?: string;
  username: string;
  role: string;
  token?: string
}

export const initialUser: User = {
  username: "",
  fullname: "",
  password: "",
  role: "user",
  email: "",
};

export interface AuthRequest {
  username: string;
  password: string;
}
