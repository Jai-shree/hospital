import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import {Expose} from "class-transformer";

export class CreateLoginDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class LoginResponseDto{
    @IsString()
    @IsEmail()
    @Expose()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    token: string;

    constructor(partial: Partial<LoginResponseDto> | Partial<Event>) {
        Object.assign(this, partial);
      }
}

export class ResetPasswordDto{
    @IsString()
    @IsNotEmpty()
    password : string;
}