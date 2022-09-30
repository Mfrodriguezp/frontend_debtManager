export type Roles = 'reader' | 'admin';

export interface User {
    userName: string,
    password: string
}

export interface UserResponse {
    message: string,
    token: string,
    idUsers: number,
    role:  Roles
}

export class User{};