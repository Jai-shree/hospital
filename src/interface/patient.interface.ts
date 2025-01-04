import {Document} from "mongoose";

export interface IPatient extends Document{
        readonly Firstname:String;
        readonly Lastname:String;
        readonly UHID:String;
        readonly age:number;
        readonly totalAppointments : number;
        readonly lastVisit: Date;
}