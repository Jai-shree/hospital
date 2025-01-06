import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Date } from "mongoose";

@Schema()
export class Patient{
    @Prop()
    firstName:string;

    @Prop()
    lastName:string;

    @Prop()
    UHID:string;

    @Prop()
    age:number;

    @Prop()
    totalAppointments : number;

    @Prop({ type: Date })
    lastVisit: Date;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);