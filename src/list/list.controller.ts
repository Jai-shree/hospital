import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListService } from './list.service';
import { UserResponseDto } from './dto/create-list.dto';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  findAll():Promise<UserResponseDto[]> {
    return this.listService.findAll();
  }

}
