import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginSchema } from 'src/schema/Login.schema';
import { Login } from 'src/schema/Login.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { EmailService } from './email.service';
import { ConfigService } from '@nestjs/config';


@Module({
  imports:[
    MongooseModule.forFeature([{
      name:'login',
      schema:LoginSchema
    }]),
  ],
  controllers: [LoginController],
  providers: [LoginService,EmailService,ConfigService],
})
export class LoginModule {}
