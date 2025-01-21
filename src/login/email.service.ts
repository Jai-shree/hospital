import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';


@Injectable()
export class EmailService {
    private nodemailerTransport: Transporter;
    constructor(
        // private readonly loginService:LoginService,
        private readonly configService: ConfigService,
        private readonly jwt : JwtService
    ){
        this.nodemailerTransport = createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: "jaishreekannan3107@gmail.com",
                pass: "whor erij mhlq rvjv"
            }
        });
    }
    async generateToken(email: string){
        return this.jwt.signAsync({ email },{secret:"hello"});
    }
    async sendResetPasswordLink(email:string) : Promise<void>{
        const token = await this.generateToken(email);
        console.log(token);
        const resetLink = `http://localhost:8080/api/login/reset-password?token=${token}`;
        await this.nodemailerTransport.sendMail({
            from: `"CS Hospitals" <22pc15@psgtech.ac.in>`,
            to: email,
            subject: 'Reset Your Password',
            html: `<p>Click the link below to reset your password:</p>
                   <a href="${resetLink}">Reset Password</a>`,
        });
    }
}
