import { JwtPayload } from "jsonwebtoken";

export interface CustomJwt extends JwtPayload {
    id: string,
    username: string,
    role?: string
}