import { Expose } from "class-transformer";
import { IS_ALPHA, IsDate, IsNumber, IsString } from "class-validator";
import { Date } from "mongoose";

export class UserResponseDto{
    @IsString()
    _id : Object

    @IsString()
    @Expose()
    firstName:string;

    @IsString()
    @Expose()
    lastName:string;

    @IsNumber()
    @Expose()
    UHID: string;

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
