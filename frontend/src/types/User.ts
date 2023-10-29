export interface UserState {
  users: User[];
  user: User | null;
  authUser?: AuthResponse;
  message?: string;
  error?: string;
  status: 'loading' | 'idle' | 'success' | 'fail';
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

export interface AuthResponse {
  id: string;
  username: string;
  roles: string[];
  token: string
}
