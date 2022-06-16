export type Roles = 'general' | 'admin';

export interface user{
    userName: string;
    password: string; 
}

export interface userResponse {
    message: string;
    token: string;
    idUsers: number;
    role:  Roles;
}

export class User{};