import { Controller, Get, Post, Body, Put,Patch, Param, Delete } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto , LoginResponseDto , ResetPasswordDto} from './dto/login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  create(@Body() createLoginDto: CreateLoginDto) :Promise<LoginResponseDto>{
    return this.loginService.create(createLoginDto);
  }

  @Put('/reset-password/:username')
  async updatePassword(@Param('username') username : string, @Body() resetPasswordDto : ResetPasswordDto){
    return this.loginService.updatePassword(username,resetPasswordDto);
  }
}
