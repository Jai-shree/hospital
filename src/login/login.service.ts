import { Injectable, UnauthorizedException,NotFoundException } from '@nestjs/common';
import { CreateLoginDto , LoginResponseDto, ResetPasswordDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Login } from 'src/schema/Login.schema';
import { Model } from 'mongoose';
import { EmailService } from './email.service';


@Injectable()
export class LoginService {
  constructor(
    @InjectModel('login') private loginModel:Model<Login>,
    private readonly jwt: JwtService,
    private readonly emailService:EmailService
  ){}

  async generateToken(email: string) {
    console.log(email);
    console.log(await this.jwt.signAsync( {email},{secret:"hello"} ));
    return this.jwt.signAsync({ email },{secret:"hello"});
  }
  async verifyToken(token: string): Promise<any> {
    try {
        const payload = await this.jwt.verifyAsync(token,{secret:"hello"});
        console.log(payload);
        return payload; 
    } catch (error) {
        throw new UnauthorizedException('Invalid or expired token');
    }
}

  async create(data: CreateLoginDto) {
    const email = await this.loginModel.findOne({email:data?.email});
    
    if (!email) {
      throw new UnauthorizedException('Incorrect email');
    }
    const pwd_bool = await bcrypt.compare(data.password, email.password);
    if (!pwd_bool) {
      throw new UnauthorizedException('Incorrect email or password');
    }
    const token = await this.generateToken(data.email);
    return new LoginResponseDto({ ...data, token });
  }

 
  async updatePassword(resetPasswordDto:ResetPasswordDto){
    const id = await this.loginModel.findOne({email:resetPasswordDto.email},"_id");
    //const new_password = await bcrypt.hash(resetPasswordDto.password);
    const existingPatient = await this.loginModel.findByIdAndUpdate(id, resetPasswordDto, { new: true });
    if (!existingPatient) {
      throw new NotFoundException(`Student #${resetPasswordDto.email} not found`);
    }
    return existingPatient;
  }


  async forgotPassword(email : string){
    console.log(email);
    const user = await this.loginModel.findOne({email:email});
    if(!user){
      throw new NotFoundException(`No user found for email: ${email}`);
    }
  }

  async resetPassword(token: string, resetPasswordDto: ResetPasswordDto){
    const isValid = await this.verifyToken(token);
    console.log(isValid);
    await this.updatePassword(resetPasswordDto);
  }
}
