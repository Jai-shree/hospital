import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginSchema } from 'src/schema/Login.schema';
import { Login } from 'src/schema/Login.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    MongooseModule.forFeature([{
      name:'login',
      schema:LoginSchema
    }]),
    JwtModule.register({ secret: 'hard!to-guess_secret' })
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
