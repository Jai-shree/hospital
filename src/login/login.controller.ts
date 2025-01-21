import { Controller, Get, Post, Body, Put,Patch, Param, Delete } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto , ForgetPasswordDto, LoginResponseDto , ResetPasswordDto} from './dto/login.dto';
import { EmailService } from './email.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService,

    private readonly emailService:EmailService,
  ) {}

  @Post()
  create(@Body() createLoginDto: CreateLoginDto) :Promise<LoginResponseDto>{
    return this.loginService.create(createLoginDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() {email} : ForgetPasswordDto): Promise<void> {
    return this.emailService.sendResetPasswordLink(email);

      // return this.loginService.forgotPassword(email);
  }

  //add token as a parameter in url
  @Put('/reset-password/:token')
  async resetPassword(@Param('token') token : string, @Body() resetPasswordDto : ResetPasswordDto){
    return this.loginService.resetPassword(token,resetPasswordDto);
  }
}
