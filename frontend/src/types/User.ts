export type User = {
    id?: string,
    username: string,
    fullname: string,
    password: string,
    email: string,
    token?: string
    image?: string
}

export const initialUser: User = {
    username: "",
    fullname: "",
    password: "",
    email: ""
}

export type AuthRequest = {
    username: string,
    password: string,
}