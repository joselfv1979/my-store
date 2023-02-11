export type User = {
    id?: string,
    username: string,
    fullname: string,
    password: string,
    roles: string[]
    email: string,
    token?: string
    image?: string
}

export const initialUser: User = {
    username: "",
    fullname: "",
    password: "",
    roles: ["user"],
    email: ""
}

export type AuthRequest = {
    username: string,
    password: string,
}