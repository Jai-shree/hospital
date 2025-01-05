import { Document } from 'mongoose';
export interface ILogin extends Document{
    readonly username: string;
    readonly password: string;
}