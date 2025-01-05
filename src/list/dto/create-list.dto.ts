import { Expose } from "class-transformer";
import { IS_ALPHA, IsDate, IsNumber, IsString } from "class-validator";
import { Date } from "mongoose";

export class UserResponseDto{
    @IsString()
    id : string

    @IsString()
    @Expose()
    firstname:string;

    @IsString()
    @Expose()
    lastname:string;

    @IsNumber()
    @Expose()
    UHID: number;

    @IsNumber()
    @Expose()
    age:number;

    @IsNumber()
    @Expose()
    totalAppoinments:number;

    @IsDate()
    @Expose()
    lastVisit: Date;

    constructor(partial: Partial<UserResponseDto> | Partial<Event>) {
        Object.assign(this, partial);
    }
}
