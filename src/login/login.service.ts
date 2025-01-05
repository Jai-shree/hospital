import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateLoginDto , LoginResponseDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Login } from 'src/schema/Login.schema';
import { Model } from 'mongoose';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel('login') private loginModel:Model<Login>,
    private readonly jwt: JwtService
  ){}

  async generateToken(username: string) {
    console.log(await this.jwt.signAsync({ username }));
    return this.jwt.signAsync({ username });
  }

  async create(data: CreateLoginDto) {
    const user = await this.loginModel.findOne({username:data?.username});
    if (!user) {
      throw new UnauthorizedException('Incorrect username');
    }
    if (user.password != data.password) {
      throw new UnauthorizedException('Incorrect username or password');
    }
    const token = await this.generateToken(data.username);
    return new LoginResponseDto({ ...data, token });
  }
}
