import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import {Expose} from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLoginDto {
    @IsString()
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    password: string;
}

export class LoginResponseDto{
    @IsString()
    @IsEmail()
    @Expose()
    @IsNotEmpty()
    email: string;

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
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email : string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password : string;
}

export class ForgetPasswordDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email: string;
}
