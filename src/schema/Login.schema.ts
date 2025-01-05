import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({collection:"login"})
export class Login{
    @Prop()
    username:String;

    @Prop()
    password:String;
}

export const LoginSchema = SchemaFactory.createForClass(Login);