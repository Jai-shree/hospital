import { IsNotEmpty, IsNumber, IsString, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class CreateListDto {
    @IsNotEmpty()
    @IsString()
    readonly Firstname:String;

    @IsNotEmpty()
    @IsString()
    readonly Lastname:String;

    @IsNotEmpty()
    @IsString()
    readonly UHID:String;

    @IsNotEmpty()
    @IsNumber()
    readonly age:number;

    @IsNotEmpty()
    @IsNumber()
    readonly totalAppointments : number;

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    readonly lastVisit: Date;
}
