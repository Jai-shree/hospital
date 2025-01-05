import { PartialType } from '@nestjs/mapped-types';
import { CreateLoginDto } from './login.dto';

export class UpdateLoginDto extends PartialType(CreateLoginDto) {}
