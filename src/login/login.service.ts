import { Injectable, UnauthorizedException,NotFoundException } from '@nestjs/common';
import { CreateLoginDto , LoginResponseDto, ResetPasswordDto } from './dto/login.dto';
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
    console.log(user);
    console.log(data);
    if (!user) {
      throw new UnauthorizedException('Incorrect username');
    }
    const pwd_bool = await bcrypt.compare(data.password, user.password);
    if (!pwd_bool) {
      throw new UnauthorizedException('Incorrect username or password');
    }
    const token = await this.generateToken(data.username);
    return new LoginResponseDto({ ...data, token });
  }

  async updatePassword(username:string , resetPasswordDto:ResetPasswordDto){
    //first find the username by id and then update it
    const id = await this.loginModel.findOne({username:username},"_id");
    const existingPatient = await this.loginModel.findByIdAndUpdate(id, resetPasswordDto, { new: true });
    if (!existingPatient) {
      throw new NotFoundException(`Student #${username} not found`);
    }
    return existingPatient;
  }
}
